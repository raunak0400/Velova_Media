import { linkProgram } from "./webgl2Utils";
import { FRAGMENT_SRC, VERTEX_SRC } from "./fluidShaderSource";
import { acquirePointerTracking, getPointerSnapshot } from "@/lib/pointerStore";

/**
 * Shared fluid-background renderer. One detached WebGL2 canvas (never
 * attached to the DOM) renders every mounted <FluidBackground> instance
 * into its own fixed-size square slot inside a single wide atlas texture,
 * via gl.viewport/gl.scissor — never a second GL context. Each instance
 * blits its slot onto its own lightweight 2D-context on-screen canvas.
 *
 * Why one shared context: 4-6 independent WebGL2 contexts sit right at (or
 * over) the ~8-16 context ceiling most browsers enforce, especially with
 * Next.js client-side navigation mounting/unmounting these sections
 * repeatedly (see PageTransition). A context is booted at most once per
 * page load here, never re-created on route change.
 *
 * Palette hex values match the existing .gradient-mesh CSS blobs in
 * globals.css (warm/blue/magenta/purple), plus one added cyan stop.
 */

const TILE_SIZE = 512;
const MAX_SLOTS = 6;
const IDLE_DECAY_MS = 900;
const MOUSE_SMOOTHING = 0.08;

const PALETTE_HEX = ["#f6e2c4", "#8ecbe8", "#c13fd6", "#6b46c8", "#4fd8c9"] as const;

function hexToVec3(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

const PALETTE_VEC3 = PALETTE_HEX.map(hexToVec3);

interface Uniforms {
  u_resolution: WebGLUniformLocation | null;
  u_time: WebGLUniformLocation | null;
  u_seed: WebGLUniformLocation | null;
  u_mouse: WebGLUniformLocation | null;
  u_mouseVelocity: WebGLUniformLocation | null;
  u_mouseInfluence: WebGLUniformLocation | null;
  u_quality: WebGLUniformLocation | null;
  u_paletteA: WebGLUniformLocation | null;
  u_paletteB: WebGLUniformLocation | null;
  u_paletteC: WebGLUniformLocation | null;
  u_paletteD: WebGLUniformLocation | null;
  u_paletteE: WebGLUniformLocation | null;
}

interface RegistryEntry {
  slot: number;
  onscreenCanvas: HTMLCanvasElement;
  onscreenCtx: CanvasRenderingContext2D;
  visible: boolean;
  width: number;
  height: number;
  seedX: number;
  seedY: number;
  onLost: () => void;
}

export interface RegionHandle {
  setVisible(visible: boolean): void;
  resize(width: number, height: number): void;
  release(): void;
}

class FluidRenderer {
  private gl: WebGL2RenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private uniforms: Uniforms | null = null;
  private vao: WebGLVertexArrayObject | null = null;
  private detachedCanvas: HTMLCanvasElement | null = null;

  private registry = new Map<number, RegistryEntry>();
  private freeSlots: number[] = [];
  private rafId = 0;
  private startTime = 0;
  private lost = false;
  private bootAttempted = false;
  private quality = 1;
  private releasePointerTracking: (() => void) | null = null;

  private smoothedX = 0;
  private smoothedY = 0;
  private prevSmoothedX = 0;
  private prevSmoothedY = 0;

  private boot(): boolean {
    if (this.bootAttempted) return this.gl !== null;
    this.bootAttempted = true;

    if (typeof document === "undefined") return false;

    const canvas = document.createElement("canvas");
    canvas.width = TILE_SIZE * MAX_SLOTS;
    canvas.height = TILE_SIZE;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false });
    } catch {
      gl = null;
    }
    if (!gl) return false;

    const program = linkProgram(gl, VERTEX_SRC, FRAGMENT_SRC);
    if (!program) return false;

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    this.detachedCanvas = canvas;
    this.gl = gl;
    this.program = program;
    this.vao = vao;
    this.uniforms = {
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_seed: gl.getUniformLocation(program, "u_seed"),
      u_mouse: gl.getUniformLocation(program, "u_mouse"),
      u_mouseVelocity: gl.getUniformLocation(program, "u_mouseVelocity"),
      u_mouseInfluence: gl.getUniformLocation(program, "u_mouseInfluence"),
      u_quality: gl.getUniformLocation(program, "u_quality"),
      u_paletteA: gl.getUniformLocation(program, "u_paletteA"),
      u_paletteB: gl.getUniformLocation(program, "u_paletteB"),
      u_paletteC: gl.getUniformLocation(program, "u_paletteC"),
      u_paletteD: gl.getUniformLocation(program, "u_paletteD"),
      u_paletteE: gl.getUniformLocation(program, "u_paletteE"),
    };

    for (let i = 0; i < MAX_SLOTS; i++) this.freeSlots.push(i);

    this.quality = this.probeDeviceTier() ? 1 : 0;
    this.startTime = performance.now();

    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
      cancelAnimationFrame(this.rafId);
      this.registry.forEach((entry) => entry.onLost());
    });

    return true;
  }

  private probeDeviceTier(): boolean {
    if (typeof navigator === "undefined" || typeof window === "undefined") return true;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const smallViewport = window.innerWidth < 768;
    return !(coarse && (lowCores || smallViewport));
  }

  acquire(onscreenCanvas: HTMLCanvasElement, onLost: () => void): RegionHandle | null {
    if (this.lost) return null;
    if (!this.boot()) return null;

    const slot = this.freeSlots.pop();
    if (slot === undefined) return null;

    const ctx = onscreenCanvas.getContext("2d");
    if (!ctx) {
      this.freeSlots.push(slot);
      return null;
    }

    const entry: RegistryEntry = {
      slot,
      onscreenCanvas,
      onscreenCtx: ctx,
      visible: true,
      width: onscreenCanvas.width || 1,
      height: onscreenCanvas.height || 1,
      seedX: (slot + 1) * 17.31,
      seedY: (slot + 1) * 5.77,
      onLost,
    };
    this.registry.set(slot, entry);

    if (!this.releasePointerTracking) {
      this.releasePointerTracking = acquirePointerTracking();
    }

    this.ensureLoopRunning();

    return {
      setVisible: (visible: boolean) => {
        entry.visible = visible;
        this.ensureLoopRunning();
      },
      resize: (width: number, height: number) => {
        entry.width = Math.max(1, width);
        entry.height = Math.max(1, height);
      },
      release: () => {
        this.registry.delete(slot);
        this.freeSlots.push(slot);
        if (this.registry.size === 0 && this.releasePointerTracking) {
          this.releasePointerTracking();
          this.releasePointerTracking = null;
        }
      },
    };
  }

  private ensureLoopRunning() {
    if (this.rafId || this.lost) return;
    const hasVisible = Array.from(this.registry.values()).some((e) => e.visible);
    if (!hasVisible) return;
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = () => {
    this.rafId = 0;
    if (this.lost) return;

    const gl = this.gl;
    const program = this.program;
    const uniforms = this.uniforms;
    if (!gl || !program || !uniforms) return;

    const visibleEntries = Array.from(this.registry.values()).filter((e) => e.visible);
    if (visibleEntries.length === 0) return;

    const now = performance.now();
    const elapsed = (now - this.startTime) / 1000;

    const pointer = getPointerSnapshot();
    const idleMs = now - pointer.lastMoveAt;
    const influence = pointer.lastMoveAt === 0 ? 0 : Math.max(0, 1 - idleMs / IDLE_DECAY_MS);

    const winW = window.innerWidth || 1;
    const winH = window.innerHeight || 1;
    const targetX = pointer.x < 0 ? 0.5 : pointer.x / winW;
    const targetY = pointer.y < 0 ? 0.5 : pointer.y / winH;

    this.prevSmoothedX = this.smoothedX;
    this.prevSmoothedY = this.smoothedY;
    this.smoothedX += (targetX - this.smoothedX) * MOUSE_SMOOTHING;
    this.smoothedY += (targetY - this.smoothedY) * MOUSE_SMOOTHING;
    const velX = (this.smoothedX - this.prevSmoothedX) * 60;
    const velY = (this.smoothedY - this.prevSmoothedY) * 60;

    gl.useProgram(program);
    gl.bindVertexArray(this.vao);
    gl.enable(gl.SCISSOR_TEST);
    gl.uniform1f(uniforms.u_time, elapsed);
    gl.uniform1f(uniforms.u_quality, this.quality);
    gl.uniform3fv(uniforms.u_paletteA, PALETTE_VEC3[0]);
    gl.uniform3fv(uniforms.u_paletteB, PALETTE_VEC3[1]);
    gl.uniform3fv(uniforms.u_paletteC, PALETTE_VEC3[2]);
    gl.uniform3fv(uniforms.u_paletteD, PALETTE_VEC3[3]);
    gl.uniform3fv(uniforms.u_paletteE, PALETTE_VEC3[4]);

    for (const entry of visibleEntries) {
      const x = entry.slot * TILE_SIZE;
      gl.viewport(x, 0, TILE_SIZE, TILE_SIZE);
      gl.scissor(x, 0, TILE_SIZE, TILE_SIZE);

      gl.uniform2f(uniforms.u_resolution, TILE_SIZE, TILE_SIZE);
      gl.uniform2f(uniforms.u_seed, entry.seedX, entry.seedY);
      gl.uniform2f(uniforms.u_mouse, this.smoothedX * TILE_SIZE, (1 - this.smoothedY) * TILE_SIZE);
      gl.uniform2f(uniforms.u_mouseVelocity, velX * TILE_SIZE, -velY * TILE_SIZE);
      gl.uniform1f(uniforms.u_mouseInfluence, influence);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    gl.disable(gl.SCISSOR_TEST);

    // Blit synchronously, in this same callback, before yielding — the
    // detached canvas's drawing buffer contents are only guaranteed
    // through the end of the current task.
    const source = this.detachedCanvas!;
    for (const entry of visibleEntries) {
      const sx = entry.slot * TILE_SIZE;
      entry.onscreenCtx.clearRect(0, 0, entry.width, entry.height);
      entry.onscreenCtx.drawImage(source, sx, 0, TILE_SIZE, TILE_SIZE, 0, 0, entry.width, entry.height);
    }

    this.ensureLoopRunning();
  };
}

let singleton: FluidRenderer | null = null;

export function getFluidRenderer(): FluidRenderer {
  if (!singleton) singleton = new FluidRenderer();
  return singleton;
}

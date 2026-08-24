"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { getFluidRenderer, type RegionHandle } from "@/lib/webgl/fluidRenderer";

interface FluidBackgroundProps {
  className?: string;
}

const MAX_DPR = 1.75;

/**
 * Drop-in replacement for GradientMesh — same signature, same
 * position/inset contract via the .fluid-bg CSS class. Renders a WebGL2
 * shader-driven fluid field (see lib/webgl/fluidRenderer.ts) that reacts
 * subtly to the cursor. Falls back to the existing .gradient-mesh CSS blob
 * markup when WebGL2 is unavailable, the context is lost, or
 * prefers-reduced-motion is on (in which case the fallback is frozen, not
 * just slowed).
 */
export function FluidBackground({ className }: FluidBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [useFallback, setUseFallback] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let handle: RegionHandle | null = null;
    let cancelled = false;

    handle = getFluidRenderer().acquire(canvas, () => {
      if (!cancelled) setUseFallback(true);
    });

    if (!handle) {
      setUseFallback(true);
      return;
    }

    const activeHandle = handle;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
      activeHandle.resize(width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => activeHandle.setVisible(entry.isIntersecting),
      { rootMargin: "150% 0px" },
    );
    intersectionObserver.observe(container);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      activeHandle.release();
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} aria-hidden="true" className={cn("fluid-bg", className)}>
      {!useFallback && <canvas ref={canvasRef} className="fluid-bg__canvas" />}
      {useFallback && (
        <div className={cn("gradient-mesh", reducedMotion && "fluid-bg--static")}>
          <span className="gradient-mesh__blob gradient-mesh__blob--a" />
          <span className="gradient-mesh__blob gradient-mesh__blob--b" />
          <span className="gradient-mesh__blob gradient-mesh__blob--c" />
          <span className="gradient-mesh__blob gradient-mesh__blob--d" />
        </div>
      )}
    </div>
  );
}

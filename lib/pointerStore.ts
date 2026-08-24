/**
 * Global pointer position, tracked outside React entirely. Consumers (the
 * WebGL fluid renderer, future magnetic/card work) poll `getPointerSnapshot`
 * inside their own rAF loop — nothing here triggers a React re-render, since
 * a re-render per pointermove would defeat the point of a 60fps-safe store.
 * Deliberately separate from CursorProvider's own pointermove listener
 * (the custom-cursor dot) — that one drives a single DOM transform per
 * event and has no reason to share a listener with a per-frame poller.
 */

interface PointerSnapshot {
  x: number;
  y: number;
  lastMoveAt: number;
}

const snapshot: PointerSnapshot = { x: -1, y: -1, lastMoveAt: 0 };

let listenerCount = 0;

function onPointerMove(e: PointerEvent) {
  snapshot.x = e.clientX;
  snapshot.y = e.clientY;
  snapshot.lastMoveAt = performance.now();
}

/**
 * Registers the shared listener on first use, ref-counted so repeated
 * acquire/release pairs (e.g. multiple FluidBackground instances mounting)
 * never double-attach or tear down while another consumer still needs it.
 */
export function acquirePointerTracking(): () => void {
  if (typeof window === "undefined") return () => {};

  if (listenerCount === 0) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
  }
  listenerCount += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;
    listenerCount -= 1;
    if (listenerCount <= 0) {
      listenerCount = 0;
      window.removeEventListener("pointermove", onPointerMove);
    }
  };
}

export function getPointerSnapshot(): Readonly<PointerSnapshot> {
  return snapshot;
}

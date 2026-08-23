"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A fixed-position "spotlight" layer that follows the pointer on
 * pointer-fine devices only. Expands over anything carrying
 * data-cursor="hover" (see Button, links, cards). Never replaces the
 * native cursor on text inputs. See Design Architecture §10.
 */
export function CursorProvider({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const render = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(render);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="hover"]')) {
        dot.dataset.state = "hover";
      } else if (target.closest("input, textarea, select")) {
        dot.dataset.state = "hidden";
      } else {
        dot.dataset.state = "default";
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(render);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reducedMotion]);

  return (
    <>
      {children}
      <div ref={dotRef} className="cursor-dot" data-state="default" aria-hidden="true" />
    </>
  );
}

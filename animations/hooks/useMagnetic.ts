"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseMagneticOptions {
  strength?: number;
  max?: number;
  enabled?: boolean;
}

/**
 * Magnetic pull toward the cursor within a padded hit zone, built on
 * gsap.quickTo (purpose-built for this high-frequency-update case).
 * transform only. Disabled under reduced motion and on coarse pointers.
 * See Design Architecture §10.
 */
export function useMagnetic<T extends HTMLElement>(
  { strength = 0.3, max = 12, enabled = true }: UseMagneticOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || reducedMotion || !enabled) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xTo(gsap.utils.clamp(-max, max, relX * strength));
      yTo(gsap.utils.clamp(-max, max, relY * strength));
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, { scope: ref, dependencies: [reducedMotion, strength, max, enabled] });

  return ref;
}

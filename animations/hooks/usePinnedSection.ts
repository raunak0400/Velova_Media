"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { registerGSAP, ScrollTrigger } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UsePinnedSectionOptions {
  id: string;
  end?: string;
  pinSpacing?: boolean;
  /** Below this width, pinning is disabled and the section falls back to normal scroll. */
  disableBelow?: number;
}

/**
 * Wraps ScrollTrigger pin setup/teardown. Every trigger gets an explicit,
 * unique id for debuggability. Auto-disabled below the given breakpoint —
 * pinned sections degrade to normal stacked scroll on mobile. See Design
 * Architecture §10/§11/§13.
 */
export function usePinnedSection<T extends HTMLElement>(
  { id, end = "+=100%", pinSpacing = true, disableBelow = 768 }: UsePinnedSectionOptions,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < disableBelow) return;

    const trigger = ScrollTrigger.create({
      id,
      trigger: el,
      start: "top top",
      end,
      pin: true,
      pinSpacing,
    });

    return () => trigger.kill();
  }, { scope: ref, dependencies: [reducedMotion, id, end, pinSpacing, disableBelow] });

  return ref;
}

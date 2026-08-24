"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, GSAP_EASE, STAGGER } from "@/constants/motion";
import type { MotionBudget } from "@/types";

interface UseStaggerRevealOptions {
  budget?: MotionBudget;
  y?: number;
  stagger?: number;
  start?: string;
}

/**
 * Fade + rise reveal for every element matching `itemSelector` inside this
 * container, staggered as one group — one ScrollTrigger per grid rather
 * than one per card, which is what keeps a page with many card grids from
 * accumulating hundreds of individual ScrollTriggers. Mirrors
 * useScrollReveal's tokens/reduced-motion/motion-budget handling; use that
 * hook instead for a single element.
 */
export function useStaggerReveal<T extends HTMLElement>(
  itemSelector: string,
  { budget, y = 24, stagger = STAGGER.grid, start = "top 85%" }: UseStaggerRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    if (items.length === 0) return;

    if (reducedMotion) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const resolvedBudget =
      budget ??
      (container.closest("[data-motion-budget]")?.getAttribute("data-motion-budget") as MotionBudget | null) ??
      "standard";

    gsap.set(items, { opacity: 0, y });

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: DURATION.base,
      ease: GSAP_EASE.entrance,
      stagger,
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: resolvedBudget === "calm" ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion, budget, y, stagger, start, itemSelector] });

  return ref;
}

"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, GSAP_EASE } from "@/constants/motion";

interface UseClipRevealOptions {
  direction?: "left" | "right" | "bottom" | "top";
  start?: string;
}

const CLIP_FROM: Record<NonNullable<UseClipRevealOptions["direction"]>, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  bottom: "inset(0 0 100% 0)",
  top: "inset(100% 0 0 0)",
};

/**
 * clip-path wipe reveal for images — never width/height based. The
 * underlying media (next/image) always loads eagerly per-viewport; only
 * its visibility is animated. See Design Architecture §10/§12.
 */
export function useClipReveal<T extends HTMLElement>(
  { direction = "bottom", start = "top 85%" }: UseClipRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { clipPath: "inset(0 0 0 0)" });
      return;
    }

    gsap.set(el, { clipPath: CLIP_FROM[direction] });

    const tween = gsap.to(el, {
      clipPath: "inset(0 0 0 0)",
      duration: DURATION.slow,
      ease: GSAP_EASE.entrance,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion, direction, start] });

  return ref;
}

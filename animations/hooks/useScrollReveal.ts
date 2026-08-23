"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP, ScrollTrigger } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, GSAP_EASE } from "@/constants/motion";

interface UseScrollRevealOptions {
  /** "calm" sections (FAQ, pricing) reveal once and never re-trigger on scroll-back. */
  budget?: "standard" | "calm";
  y?: number;
  delay?: number;
  start?: string;
}

/**
 * The standard fade + rise reveal used across cards, paragraphs and
 * section headers. See Design Architecture §10/§11.
 */
export function useScrollReveal<T extends HTMLElement>(
  { budget = "standard", y = 24, delay = 0, start = "top 85%" }: UseScrollRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: DURATION.base,
      delay,
      ease: GSAP_EASE.entrance,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: budget === "calm" ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion, budget, y, delay, start] });

  return ref;
}

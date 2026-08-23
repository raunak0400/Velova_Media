"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION } from "@/constants/motion";

interface UseCounterOptions {
  to: number;
  prefix?: string;
  suffix?: string;
  start?: string;
}

/**
 * The fix for the audited stat-counter bug (SEO Blueprint §2.2): counters
 * previously rendered as literal "0" because the count-up animation started
 * at 0 and only filled in after client JS ran, so crawlers and slow
 * connections saw empty stats.
 *
 * This hook does NOT own the number. The server-rendered element already
 * contains the real final value as plain text (see StatCounter component)
 * — this only re-tweens that node's textContent upward from 0 for effect,
 * updating the DOM directly rather than React state, so there is no
 * hydration mismatch and no window where the correct value is absent.
 * If JS fails or hasn't run yet, the real number was already correct.
 * See Design Architecture §15.
 */
export function useCounter<T extends HTMLElement>(
  { to, prefix = "", suffix = "", start = "top 85%" }: UseCounterOptions,
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || reducedMotion) return;

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: to,
      duration: DURATION.cinematic,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = `${prefix}${to}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion, to, prefix, suffix, start] });

  return ref;
}

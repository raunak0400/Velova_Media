"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Mirrors [data-mode="light"] / [data-mode="dark"] token values in
// app/globals.css — kept in sync manually since GSAP needs explicit
// from/to color strings to scrub a CSS custom property.
const LIGHT = { bg: "#efefef", text: "#0a0a0a", border: "#d4d4d4" };
const DARK = { bg: "#000000", text: "#f5f4f7", border: "#262626" };

/**
 * Scrub-tweens a light section's own --velova-* custom properties toward
 * the following dark section's values as its trailing edge approaches the
 * viewport, so the environment fades into the next section's dark register
 * instead of cutting instantly at the data-mode boundary. The override is
 * an inline style on this element only (higher specificity than the
 * [data-mode="light"] attribute selector) — it never touches :root, so it
 * can't leak into unrelated sections, and reverses cleanly on scroll-up
 * since scrub ties directly to scroll position either direction.
 */
export function useLightDarkMorph<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || reducedMotion) return;

    const tween = gsap.fromTo(
      el,
      { "--velova-bg": LIGHT.bg, "--velova-text": LIGHT.text, "--velova-border": LIGHT.border },
      {
        "--velova-bg": DARK.bg,
        "--velova-text": DARK.text,
        "--velova-border": DARK.border,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "bottom-=400 bottom",
          end: "bottom top",
          // Slightly larger catch-up than the parallax: this scrubs a
          // background-color repaint across a large section, so a bit of
          // smoothing lets the wash glide and masks any per-frame paint
          // stepping on lower-end devices.
          scrub: 0.7,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion] });

  return ref;
}

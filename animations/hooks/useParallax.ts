"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseParallaxOptions {
  /** Max travel differential as a percentage of element height. Capped low on purpose — see §10. */
  depth?: number;
}

/**
 * Scrubbed transform parallax for background media only. Capped travel so
 * it reads as dimensional rather than causing reading-position drift.
 * See Design Architecture §10.
 */
export function useParallax<T extends HTMLElement>(
  { depth = 15 }: UseParallaxOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el || reducedMotion) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -depth / 2 },
      {
        yPercent: depth / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          // Numeric scrub (vs `true`) gives GSAP a short catch-up window so the
          // parallax glides toward the scroll position instead of tracking it
          // pixel-exact every frame — reads noticeably smoother, especially
          // layered on top of Lenis's already-interpolated scroll. Kept small
          // so the parallax still feels anchored to the scroll, not laggy.
          scrub: 0.4,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { scope: ref, dependencies: [reducedMotion, depth] });

  return ref;
}

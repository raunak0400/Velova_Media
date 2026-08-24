"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP, SplitText } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, GSAP_EASE, STAGGER } from "@/constants/motion";

interface UseSplitRevealOptions {
  type?: "words" | "lines";
  trigger?: "scroll" | "load";
  delay?: number;
  start?: string;
}

/**
 * Splits real, already-rendered text into words (headings) or lines (body
 * copy) and reveals them with a translateY + opacity stagger. The element
 * must already contain its final text server-side — this only re-wraps it
 * for the visual effect; it never injects or removes text. SplitText
 * instances are reverted on cleanup so hydration/re-render never sees a
 * stale DOM mutation. See Design Architecture §10/§11/§14.
 */
export function useSplitReveal<T extends HTMLElement>(
  { type = "words", trigger = "scroll", delay = 0, start = "top 85%" }: UseSplitRevealOptions = {},
): RefObject<T | null> {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    // Webfonts (Syne/General Sans) can still be swapping in when this runs.
    // Splitting before the final font is active measures stale word/line
    // widths, so a later font-swap reflow leaves the masked spans
    // mispositioned (visible as overlapping text). Wait for the real
    // metrics first — falls back to an immediate split if the Fonts API
    // isn't available (older browsers) or already settled.
    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled || !el) return;
      split = SplitText.create(el, {
        type: type === "words" ? "words,lines" : "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        mask: type === "words" ? "words" : "lines",
        // .text-shine relies on background-clip:text + color:transparent on
        // one specific element — splitting inside it moves its text node
        // into a new child span that doesn't carry that gradient fill,
        // rendering fully invisible. Leaving it unsplit keeps the effect
        // intact; it still rides along inside its enclosing word/line mask.
        ignore: ".text-shine",
      });

      const targets = type === "words" ? split.words : split.lines;
      gsap.set(targets, { yPercent: 115, opacity: 0 });

      tween = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: DURATION.base,
        delay,
        stagger: type === "words" ? STAGGER.text * 6 : 0.08,
        ease: GSAP_EASE.entrance,
        ...(trigger === "scroll"
          ? {
              scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
              },
            }
          : {}),
      });
    };

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(setup);
    } else {
      setup();
    }

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, { scope: ref, dependencies: [reducedMotion, type, trigger, delay, start] });

  return ref;
}

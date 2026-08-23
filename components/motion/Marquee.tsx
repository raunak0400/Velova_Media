"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MarqueeProps {
  items: string[];
  /** Seconds for one full loop. */
  duration?: number;
}

/**
 * Constant-velocity CSS marquee, pauses on hover/focus — kota.co.uk's
 * "SHOWREEL SHOWREEL" ticker treatment: giant bold uppercase type on a
 * dark bed, with a small square mark between repeats standing in for the
 * logo tile Kota uses. No client-logo strip here — the SEO Blueprint flags
 * the previous unlabelled "Trusted by Brands" carousel as an unsupported-
 * claim trust problem (§2.2), so this uses real, non-fabricated content
 * (service names) instead of logos we don't have permission to show.
 */
export function Marquee({ items, duration = 22 }: MarqueeProps) {
  const reducedMotion = useReducedMotion();

  const row = (ariaHidden: boolean) => (
    <div aria-hidden={ariaHidden} className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span className="font-display font-bold uppercase text-[clamp(1.75rem,4.5vw,3.5rem)] tracking-tight text-text px-6">
            {item}
          </span>
          <span aria-hidden="true" className="w-3 h-3 border-2 border-accent shrink-0 rotate-45" />
        </span>
      ))}
    </div>
  );

  return (
    <div data-mode="dark" className="relative bg-bg border-y border-border py-8 md:py-10 overflow-hidden">
      {reducedMotion ? (
        <div className="px-5 overflow-x-auto scrollbar-none">{row(false)}</div>
      ) : (
        <div
          className="flex w-max group-hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${duration}s linear infinite` }}
        >
          {row(false)}
          {row(true)}
        </div>
      )}
    </div>
  );
}

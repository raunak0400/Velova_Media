"use client";

import { ArrowDownLeft } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { useParallax, useStaggerReveal } from "@/animations/hooks";
import { PLATFORMS } from "@/data/platforms";

/**
 * kota.co.uk devotes a full giant-heading section to a client-logo wall.
 * Velova doesn't have signed-off client logos to show (see Marquee's note
 * on the SEO Blueprint's unsupported-claim flag), so this reproduces the
 * same visual beat — giant heading, diagonal arrow, a wall of marks —
 * honestly: the ad/commerce platforms Velova actually runs campaigns on.
 */

export function PlatformsStrip() {
  const pillsRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 14, stagger: 0.04 });
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]");
  const headingParallaxRef = useParallax<HTMLDivElement>({ depth: 8 });

  return (
    <section data-mode="dark" className="relative bg-bg text-text py-20 md:py-32 border-b border-border overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div ref={headerRef} className="relative mb-14 max-w-3xl">
          <p data-reveal-item className="eyebrow mb-4">Platforms We Run On</p>
          <div ref={headingParallaxRef}>
            <AnimatedHeading as="h2" className="heading-giant text-text">
              Platforms
            </AnimatedHeading>
          </div>
          <ArrowDownLeft
            data-reveal-item
            className="hidden md:block absolute top-0 right-0 text-text-2"
            size={40}
            strokeWidth={1.5}
          />
        </div>

        <div ref={pillsRef} className="flex flex-wrap gap-4">
          {PLATFORMS.map((platform) => (
            <span
              key={platform}
              data-reveal-item
              className="font-display font-semibold uppercase tracking-tight text-[clamp(1.25rem,2.2vw,2rem)] border border-border rounded-[var(--radius-pill)] px-8 py-4 text-text-2 hover:text-text hover:border-text transition-colors"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

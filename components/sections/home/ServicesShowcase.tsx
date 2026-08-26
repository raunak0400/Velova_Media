"use client";

import { ArrowDownLeft, ArrowRight } from "lucide-react";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { VideoReveal } from "@/components/motion/VideoReveal";
import { Button } from "@/components/ui/Button";
import { HERO_SERVICES } from "@/data/services";
import { service } from "@/constants/routes";

/**
 * Branding showreels cycled across the service tiles: tile 1 → Branding-1,
 * 2 → Branding-2, 3 → Branding-3, 4 → Branding-1, and so on (index % 3). A
 * per-service `videoSrc` in data/services.ts still overrides its slot.
 */
const BRANDING_VIDEOS = ["/Branding-1.mp4", "/Branding-2.mp4", "/Branding-3.mp4"];

/**
 * kota.co.uk's "OUR SERVICES" treatment: a giant intro panel pins to the top,
 * then each service panel is `position: sticky` and slides up over the one
 * before it as you scroll — the "flipping pages of a book" stack.
 *
 * Implemented as a pure-CSS sticky-stack rather than a GSAP pin: Lenis runs in
 * native-scroll mode here, so top:0 sticky sticks to the viewport, and this
 * avoids a pin hijacking scroll and fighting the per-card ScrollTriggers
 * elsewhere on the page (same reasoning as CaseStudiesScroll). Each panel is
 * opaque (bg-bg) with a rounded top edge + top shadow, so the incoming panel
 * reads as a sheet covering the previous one.
 *
 * Media areas are VideoReveal placeholders until real footage is dropped in
 * per service via `videoSrc` in data/services.ts.
 */
export function ServicesShowcase() {
  return (
    <section id="services" className="relative bg-bg">
      {/* Intro — "OUR SERVICES" */}
      <div data-mode="light" className="lg:sticky lg:top-0 h-screen overflow-hidden bg-bg flex items-center">
        <GradientMesh />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16">
          <div className="relative">
            <h2 className="heading-giant text-text" style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}>
              <span className="block">Our</span>
              <span className="block pl-[0.5em]">Services</span>
            </h2>
            <ArrowDownLeft
              aria-hidden="true"
              strokeWidth={1.1}
              className="hidden md:block absolute right-0 bottom-[0.15em] text-text w-[11vw] h-[11vw] max-w-[190px] max-h-[190px]"
            />
          </div>
        </div>
      </div>

      {/* Stacked service panels — each slides up over the previous */}
      {HERO_SERVICES.map((s, i) => (
        <article
          key={s.slug}
          data-mode="light"
          className="lg:sticky lg:top-0 lg:min-h-screen overflow-hidden bg-bg rounded-t-[2rem] md:rounded-t-[3rem] border-t border-border shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.28)] flex items-center"
        >
          <div className="mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <h3 className="font-display font-medium text-text tracking-[-0.02em] leading-[0.98] text-[clamp(2.5rem,5.5vw,5rem)] mb-8">
                {s.cardTitle}
              </h3>

              {s.tags && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-body text-text"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-body-lg text-text-2 leading-relaxed max-w-lg mb-8">{s.cardSummary}</p>

              <Button
                variant="secondary"
                href={service(s.slug)}
                icon={<ArrowRight size={18} strokeWidth={2} aria-hidden="true" />}
              >
                Find out more
              </Button>
            </div>

            {/* Right — media (drop a `videoSrc` into data/services.ts to fill) */}
            <VideoReveal
              src={s.videoSrc ?? BRANDING_VIDEOS[i % BRANDING_VIDEOS.length]}
              alt={`${s.cardTitle} showcase`}
              placeholderVariant="ink"
              className="corner-card-lg w-full aspect-[4/3] lg:aspect-auto lg:h-[560px]"
            />
          </div>
        </article>
      ))}
    </section>
  );
}

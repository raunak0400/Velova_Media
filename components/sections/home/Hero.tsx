"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { VideoReveal } from "@/components/motion/VideoReveal";
import { useSplitReveal, useStaggerReveal } from "@/animations/hooks";
import { ROUTES, caseStudy } from "@/constants/routes";
import { PLATFORMS } from "@/data/platforms";
import { CASE_STUDIES } from "@/data/case-studies";
import { cn } from "@/lib/utils/cn";

/**
 * H1 copy per client direction: "Where Brands Starts To Shine" (matches
 * BUSINESS.tagline verbatim). Laid out as three fixed stacked lines — matching
 * kota.co.uk's "rebel / against / b[circle]ring" rhythm — with the circle
 * replacing the "o" in "To" (the tagline's only round-glyph letter), sized
 * in `em` so it scales with the word it's standing in for. Kota's hero is
 * pure black text throughout (no color highlight), so "Shine" carries no
 * gradient — weight is the only emphasis. type="words" (not "lines")
 * deliberately: SplitText's line-mask sizes each line's overflow-hidden box
 * from its own measured text height, and an inline circular image taller
 * than the line was clipping the adjacent glyph. Word-level masks are sized
 * per word, so they're unaffected by a sibling inline element's height.
 */
export function Hero() {
  const subheadingRef = useSplitReveal<HTMLParagraphElement>({ type: "lines", trigger: "load", delay: 0.6 });
  const platformsRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 10, stagger: 0.04, start: "top 100%" });
  const buttonsRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 14, stagger: 0.08, start: "top 100%" });
  const featuredCase = CASE_STUDIES[1];

  return (
    <section data-mode="light" className="relative min-h-[100svh] h-auto md:h-screen flex flex-col md:overflow-hidden">
      <div className="relative z-10 flex-1 flex items-center mx-auto max-w-[1600px] w-full px-edge md:px-8 lg:px-16 pt-16">
        <div className="relative w-full">
          <AnimatedHeading
            as="h1"
            type="words"
            trigger="load"
            delay={0.15}
            className="heading-hero font-bold text-text lowercase leading-[0.85] tracking-[-0.02em] text-[clamp(2.75rem,11vw,10rem)] md:text-[clamp(3rem,10.5vw,10rem)]"
          >
            <span className="block">Where Brands</span>
            <span className="block -mt-[0.42em]">
              Starts T
              <Link
                href={caseStudy(featuredCase.slug)}
                data-cursor="hover"
                className="inline-block align-middle ml-[0.08em] -translate-y-[5%] rounded-full w-[1.1em] h-[1.1em] overflow-hidden border border-border normal-case"
                aria-label={`Featured case study: ${featuredCase.clientLabel}`}
              >
                <VideoReveal
                  src="/show-reel.mp4"
                  poster="/show-reel-poster.jpg"
                  alt={`${featuredCase.clientLabel} show reel`}
                  placeholderVariant="ember"
                  className="w-full h-full rounded-full"
                />
              </Link>
            </span>
            <span className="block -mt-[0.22em]">Shine</span>
          </AnimatedHeading>

          <p className="hidden lg:block absolute right-0 top-[38%] max-w-[340px] xl:max-w-[480px] pr-6 lg:pr-10 text-h3 text-text-2 leading-snug text-left">
            A digital marketing agency based in Ahmedabad, where{" "}
            <strong className="text-text font-semibold">creative strategy meets measurable growth</strong> for
            ambitious brands worldwide.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-edge md:px-8 lg:px-16 pb-10 md:pb-8">
        <div ref={platformsRef} className="hidden md:flex flex-wrap items-center gap-x-5 gap-y-2">
          {PLATFORMS.map((platform, i) => (
            <span
              key={platform}
              data-reveal-item
              className={cn(
                "font-display text-xs font-semibold uppercase tracking-wide text-text-2 pl-5",
                i === 0 && "pl-0",
                i > 0 && "border-l border-text/20",
              )}
            >
              {platform}
            </span>
          ))}
        </div>

        <div className="w-full md:max-w-md md:text-right flex flex-col md:items-end gap-5 md:gap-6">
          <p ref={subheadingRef} className="text-body md:text-body-lg text-text-2 leading-relaxed">
            From Meta Ads to Shopify to SEO — Ahmedabad&apos;s full-stack digital marketing agency delivering{" "}
            <strong className="text-text font-semibold">measurable results for ambitious brands</strong> across
            India, the UK, the USA, Canada and the Netherlands.
          </p>
          <div ref={buttonsRef} className="hidden sm:flex sm:flex-row sm:flex-wrap sm:w-auto items-stretch sm:items-center md:justify-end gap-3 sm:gap-4">
            <span data-reveal-item className="w-full sm:w-auto">
              <Button variant="primary" size="lg" href={ROUTES.contact} icon={<ArrowRight size={18} />} className="w-full sm:w-auto justify-center">
                Get a Free Consultation
              </Button>
            </span>
            <span data-reveal-item className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" href={ROUTES.caseStudies} className="w-full sm:w-auto justify-center">
                View Our Work
              </Button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

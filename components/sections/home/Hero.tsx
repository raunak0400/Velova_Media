"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { useSplitReveal } from "@/animations/hooks";
import { ROUTES, caseStudy } from "@/constants/routes";
import { MARKETS_SERVED } from "@/constants/business";
import { CASE_STUDIES } from "@/data/case-studies";

/**
 * H1 copy per client direction: "Where Brands Start To Shine" (a variant
 * of BUSINESS.tagline) replaces the longer SEO-blueprint headline as the
 * on-page hero statement. The lowercase display treatment and the "Shine"
 * gradient highlight are presentational only (text-transform + an inline
 * span).
 */
export function Hero() {
  const subheadingRef = useSplitReveal<HTMLParagraphElement>({ type: "lines", trigger: "load", delay: 0.6 });
  const featuredCase = CASE_STUDIES[1];

  return (
    <section data-mode="light" className="relative min-h-screen flex flex-col overflow-hidden bg-bg border-b border-border">
      <GradientMesh />

      <div className="relative z-10 flex-1 flex items-center mx-auto max-w-[1600px] w-full px-5 md:px-8 lg:px-16 pt-28">
        <AnimatedHeading
          as="h1"
          type="lines"
          trigger="load"
          delay={0.15}
          className="heading-hero font-bold text-text lowercase leading-[0.85] tracking-[-0.02em] text-[clamp(2.75rem,8.5vw,8rem)] max-w-[90%]"
        >
          Where Brands{" "}
          <Link
            href={caseStudy(featuredCase.slug)}
            data-cursor="hover"
            className="inline-block align-middle mx-2 -translate-y-2 corner-card w-24 h-14 md:w-32 md:h-20 overflow-hidden border border-border normal-case"
            aria-label={`Featured case study: ${featuredCase.clientLabel}`}
          >
            <ImageReveal alt={featuredCase.clientLabel} placeholderVariant="ember" className="w-full h-full" />
          </Link>{" "}
          Start To <span className="text-shine">Shine</span>
        </AnimatedHeading>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 px-5 md:px-8 lg:px-16 pb-14">
        <div className="flex flex-wrap items-center gap-2.5">
          {MARKETS_SERVED.map((code) => (
            <span
              key={code}
              className="font-display text-xs font-bold border border-text/40 text-text-2 px-3 py-1.5"
            >
              {code}
            </span>
          ))}
        </div>

        <div className="max-w-md md:text-right flex flex-col md:items-end gap-6">
          <p ref={subheadingRef} className="text-body-lg text-text-2 leading-relaxed">
            From Meta Ads to Shopify to SEO — Ahmedabad&apos;s full-stack digital marketing agency delivering{" "}
            <strong className="text-text font-semibold">measurable results for ambitious brands</strong> across
            India, the UK, the USA, Canada and the Netherlands.
          </p>
          <div className="flex flex-wrap items-center md:justify-end gap-4">
            <Button variant="primary" size="lg" href={ROUTES.contact} icon={<ArrowRight size={18} />}>
              Get a Free Consultation
            </Button>
            <Button variant="secondary" size="lg" href={ROUTES.caseStudies}>
              View Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

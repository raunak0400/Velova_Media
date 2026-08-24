"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { useParallax, useStaggerReveal } from "@/animations/hooks";
import { CASE_STUDIES } from "@/data/case-studies";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";

/**
 * Native horizontal scroll-snap carousel with arrow controls — deliberately
 * not a GSAP-pinned scrub. A pin hijacks the page's vertical scroll while
 * per-card scroll-triggered reveals (clip-path on the images) key off each
 * card's own viewport position; those two mechanisms fight once the cards
 * sit off-screen to the right under a transform, producing stuck/overlapping
 * "unrevealed" cards. A plain scrollable row has no such conflict.
 */
export function CaseStudiesScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const revealRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 32, stagger: 0.08 });
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { stagger: 0.08 });
  const headingParallaxRef = useParallax<HTMLDivElement>({ depth: 8 });
  const [active, setActive] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? 1;
    setActive(Math.round(track.scrollLeft / (cardWidth + 20)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateActive, { passive: true });
    return () => track.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.getBoundingClientRect().width ?? 400;
    track.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section data-mode="dark" className="relative bg-bg border-b border-border overflow-hidden">
      <div ref={headerRef} className="relative z-10 pt-16 md:pt-24 pb-10 px-5 md:px-8 lg:px-16 max-w-3xl">
        <p data-reveal-item className="eyebrow mb-4">Featured Work</p>
        <p data-reveal-item className="text-body-lg text-text-2 mb-6 max-w-lg leading-relaxed">
          Full write-ups are being published as clients confirm what they&apos;re comfortable sharing publicly —
          here&apos;s what we&apos;ve been working on.
        </p>
        <div ref={headingParallaxRef}>
          <AnimatedHeading as="h2" className="heading-giant text-text">
            Work
          </AnimatedHeading>
        </div>
        <span aria-hidden="true" className="block h-[3px] w-full mt-4 bg-signal" />
      </div>

      <div
        ref={(el) => {
          trackRef.current = el;
          revealRef.current = el;
        }}
        className="relative z-10 flex gap-5 px-5 md:px-8 lg:px-16 pb-10 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
      >
        {CASE_STUDIES.map((cs) => (
          <CaseStudyCard key={cs.slug} study={cs} className="shrink-0 w-[85vw] sm:w-[420px] snap-start" />
        ))}

        <Link
          href={ROUTES.caseStudies}
          data-cursor="hover"
          data-reveal-item
          className="corner-card-lg group shrink-0 w-[85vw] sm:w-[420px] snap-start border border-dashed border-border flex flex-col items-center justify-center gap-3 text-text-2 hover:text-accent-text hover:border-accent-text transition-colors"
        >
          <span className="font-display text-h4">All case studies</span>
          <ArrowUpRight size={20} />
        </Link>
      </div>

      <div className="relative z-10 flex items-center justify-between px-5 md:px-8 lg:px-16 pb-16 md:pb-24">
        <div className="flex items-center gap-2" role="presentation">
          {CASE_STUDIES.map((cs, i) => (
            <span
              key={cs.slug}
              className={cn("h-1.5 rounded-full transition-all", i === active ? "w-6 bg-accent" : "w-1.5 bg-border")}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous"
            data-cursor="hover"
            onClick={() => scrollByCard(-1)}
            className="w-11 h-11 rounded-full border-2 border-border text-text flex items-center justify-center transition-colors hover:border-text"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label="Next"
            data-cursor="hover"
            onClick={() => scrollByCard(1)}
            className="w-11 h-11 rounded-full border-2 border-border text-text flex items-center justify-center transition-colors hover:border-text"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

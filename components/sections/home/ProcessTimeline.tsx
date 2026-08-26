"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Play } from "lucide-react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { PROCESS_STEPS } from "@/data/process";
import { cn } from "@/lib/utils/cn";

/**
 * kota.co.uk's "brand-to-build framework" section, rebuilt as a scroll-driven
 * card stack instead of a click carousel (per client direction).
 *
 * Layout mirrors KOTA: the big heading scrolls up normally, then the pills +
 * tall media card PIN to the viewport and each step's self-contained card
 * slides in from the RIGHT and fully covers the previous one as you scroll — a
 * clean deck-of-cards stack (cards are opaque, so no messy overlap, and the
 * card gets nearly a full viewport of height so its media reads as a proper
 * near-square tile rather than a thin rectangle).
 *
 * Desktop only (`motion-safe` + ≥1024px): pinned + GSAP-scrubbed, following the
 * same pattern as PinnedStory so it never fights Lenis. Below that (or under
 * prefers-reduced-motion) the `motion-safe:lg:*` classes drop out and the cards
 * fall back to a normal vertical list. Media areas are dark placeholders until
 * a `videoSrc` is added per step in data/process.ts.
 */
export function ProcessTimeline() {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const pin = pinRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!pin || cards.length === 0) return;
    if (reducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    gsap.set(cards, { xPercent: (i) => (i === 0 ? 0 : 100), zIndex: (i) => i + 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        scrub: 0.6,
        pin: true,
        id: "framework-stack",
        onUpdate: () => {
          let a = 0;
          cards.forEach((c, i) => {
            if ((gsap.getProperty(c, "xPercent") as number) < 50) a = i;
          });
          if (a !== activeRef.current) {
            activeRef.current = a;
            setActive(a);
          }
        },
      },
    });

    cards.forEach((card, i) => {
      if (i === 0) return;
      tl.fromTo(card, { xPercent: 100 }, { xPercent: 0, ease: "power2.inOut", duration: 0.5 }, i - 0.5);
    });
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: pinRef, dependencies: [reducedMotion] });

  return (
    <section data-mode="light" className="relative bg-bg border-b border-border">
      {/* Big heading — scrolls up as the pinned stack takes over (KOTA behaviour) */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <h2 className="mx-auto max-w-5xl text-center font-display font-medium text-text tracking-[-0.02em] leading-[1.0] text-[clamp(2.5rem,6.5vw,6.5rem)] pt-24 md:pt-28 pb-10 md:pb-14">
          From first message to monthly report.
        </h2>
      </div>

      {/* Pinned: pills + tall card stack */}
      <div
        ref={pinRef}
        className="relative overflow-hidden pb-16 lg:pb-0 motion-safe:lg:flex motion-safe:lg:h-screen motion-safe:lg:flex-col motion-safe:lg:justify-center"
      >
        <GradientMesh />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16">
          <div className="mb-8 flex flex-wrap justify-center gap-3 md:mb-10">
            {PROCESS_STEPS.map((step, i) => (
              <span
                key={step.index}
                className={cn(
                  "rounded-[var(--radius-pill)] border-2 px-5 py-2.5 text-sm font-semibold transition-colors duration-300",
                  active === i
                    ? "border-text bg-[var(--color-text)] text-[var(--color-bg)]"
                    : "border-border text-text-2",
                )}
              >
                {step.title}
              </span>
            ))}
          </div>

          <div className="relative flex flex-col gap-6 motion-safe:lg:block motion-safe:lg:h-[62vh] motion-safe:lg:max-h-[600px] motion-safe:lg:gap-0 motion-safe:lg:overflow-hidden">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.index}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative motion-safe:lg:absolute motion-safe:lg:inset-0"
              >
                <div className="corner-card-lg grid h-full grid-cols-1 overflow-hidden border border-border bg-surface lg:grid-cols-[1.05fr_0.95fr]">
                  {/* Media — drop a `videoSrc` into data/process.ts to fill */}
                  <div className="relative min-h-[240px] overflow-hidden bg-[#141414] lg:min-h-0">
                    {step.videoSrc ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src={step.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={`${step.title} showcase`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label={`${step.title} showcase`}>
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm">
                          <Play className="ml-0.5 h-6 w-6" fill="currentColor" strokeWidth={0} aria-hidden="true" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Copy */}
                  <div className="flex flex-col justify-center bg-surface p-8 md:p-12">
                    <span className="text-data font-display text-lg font-semibold text-accent-text">{step.index}</span>
                    <h3 className="font-display font-medium text-text tracking-[-0.015em] leading-[1.0] text-[clamp(1.75rem,3vw,3rem)] mt-3 mb-5">
                      {step.title}
                    </h3>
                    <p className="max-w-md text-body-lg leading-relaxed text-text-2">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

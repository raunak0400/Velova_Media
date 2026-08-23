"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GradientMesh } from "@/components/motion/GradientMesh";

const BEATS = [
  {
    label: "Ahmedabad Roots",
    body: "Founded in Ahmedabad, Gujarat — deep familiarity with Indian buyer behaviour and the WhatsApp-first conversion patterns most agencies from outside the market don't have.",
  },
  {
    label: "A Decade of Meta Ads",
    body: "10+ years running Meta Ads and social media for clients who don't settle for vanity metrics.",
  },
  {
    label: "Global Reach",
    body: "Today that same team runs campaigns for brands across India, the UK, the USA, Canada and the Netherlands — one dedicated team, wherever your customers are.",
  },
];

/**
 * The homepage's one narrative pin. Three beats cross-fade as the user
 * scrolls through a single sticky viewport — a real sticky-storytelling
 * moment, not a scroll-jack gimmick, since it unpins cleanly on mobile.
 * See Design Architecture §10.
 */
export function PinnedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const container = containerRef.current;
    const beats = beatRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!container || beats.length === 0) return;

    if (reducedMotion) {
      gsap.set(beats, { opacity: 1, y: 0 });
      return;
    }
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      gsap.set(beats, { opacity: 1, y: 0, position: "relative" });
      return;
    }

    gsap.set(beats, { opacity: 0, y: 24 });
    gsap.set(beats[0], { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${beats.length * 100}%`,
        scrub: 0.6,
        pin: true,
        id: "home-pinned-story",
      },
    });

    beats.forEach((beat, i) => {
      if (i === 0) return;
      tl.to(beats[i - 1], { opacity: 0, y: -24, duration: 0.4 }, i - 0.5)
        .to(beat, { opacity: 1, y: 0, duration: 0.4 }, i - 0.4);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <section
      ref={containerRef}
      data-mode="dark"
      className="relative h-screen md:h-screen flex flex-col md:block border-b border-border overflow-hidden bg-bg"
    >
      <GradientMesh />
      <div className="relative z-10 md:absolute md:inset-0 flex items-center">
        <div className="mx-auto max-w-[1440px] w-full px-5 md:px-8 lg:px-16 py-16 md:py-0">
          <div className="relative max-w-3xl md:min-h-[280px] flex flex-col gap-8 md:gap-0">
            {BEATS.map((beat, i) => (
              <div
                key={beat.label}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className="md:absolute md:inset-0 flex flex-col justify-center"
              >
                <p className="eyebrow mb-5">{beat.label}</p>
                <p className="font-display text-h2 text-text leading-tight">{beat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { X } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { useStaggerReveal } from "@/animations/hooks";
import { WHY_VELOVA } from "@/data/why-velova";

/**
 * kota.co.uk's "Three Core Pillars" treatment: numbered, corner-radius
 * cards floating over a drifting gradient mesh, with small "x" dividers
 * between them. Velova has four cards rather than three — same language,
 * one more column.
 */
export function WhyVelova() {
  const gridRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]");
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]");

  return (
    <section data-mode="light" className="relative bg-bg text-text py-20 md:py-32 border-b border-border overflow-hidden">
      <GradientMesh />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div ref={headerRef} className="max-w-3xl mb-14">
          <p data-reveal-item className="eyebrow mb-4">Why Velova</p>
          <AnimatedHeading as="h2" className="text-h1 text-text font-semibold">
            Built to be the agency you don&apos;t have to manage.
          </AnimatedHeading>
        </div>

        <div ref={gridRef} className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0">
          {WHY_VELOVA.map((card, i) => (
            <div key={card.title} data-reveal-item className="flex items-stretch flex-1">
              <div className="corner-card-lg flex-1 border border-border bg-bg/85 backdrop-blur-sm p-8 flex flex-col min-h-[300px]">
                <span className="text-data font-display font-semibold text-accent-text text-lg mb-8">
                  0{i + 1} &mdash;
                </span>
                <h3 className="font-display text-h3 font-bold text-text mb-4">{card.title}</h3>
                <p className="text-caption text-text-2 leading-relaxed mt-auto">{card.description}</p>
              </div>
              {i < WHY_VELOVA.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-10 shrink-0 text-text-2">
                  <X size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

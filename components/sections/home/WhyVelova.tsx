"use client";

import { X } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
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
    <section data-mode="light" className="relative text-text py-16 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center border-b border-border overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16 lg:py-12">
        <div ref={headerRef} className="mb-8 md:mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <p data-reveal-item className="eyebrow mb-5">Why Velova</p>
            <AnimatedHeading
              as="h2"
              className="text-[clamp(2.5rem,5vw,4.75rem)] font-medium text-text leading-[1.03] tracking-[-0.015em]"
            >
              Built to be the agency you don&apos;t have to manage.
            </AnimatedHeading>
          </div>
          <p
            data-reveal-item
            className="text-body-lg text-text leading-relaxed lg:col-span-4 lg:col-start-9 lg:pt-3"
          >
            Most brands don&apos;t need another dashboard &mdash; they need one team that owns the
            strategy, runs it, and reports back in plain numbers.
          </p>
        </div>

        <div ref={gridRef} className="flex flex-col lg:flex-row lg:items-stretch gap-4 lg:gap-0">
          {WHY_VELOVA.map((card, i) => (
            <div key={card.title} data-reveal-item className="flex items-stretch flex-1">
              <div className="corner-card-lg flex-1 border border-border bg-bg/85 backdrop-blur-sm p-8 md:p-9 flex flex-col min-h-[300px] lg:min-h-[360px]">
                <span className="text-data font-display font-semibold text-accent-text text-lg">
                  0{i + 1} &mdash;
                </span>
                <div className="mt-auto">
                  <h3 className="font-display text-h2 font-bold text-text mb-5 leading-[1.05]">{card.title}</h3>
                  <p className="text-caption text-text-2 leading-relaxed max-w-[28ch]">{card.description}</p>
                </div>
              </div>
              {i < WHY_VELOVA.length - 1 && (
                <div className="hidden lg:flex items-center justify-center w-16 shrink-0 text-text-2">
                  <X size={40} strokeWidth={1.25} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

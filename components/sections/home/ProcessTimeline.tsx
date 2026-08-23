"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { PROCESS_STEPS } from "@/data/process";
import { DURATION } from "@/constants/motion";
import { cn } from "@/lib/utils/cn";

/**
 * kota.co.uk's "brand-to-build framework" section: a row of pill tabs
 * (first solid/active, rest outline) that swap a description + visual
 * panel below — reused here for Velova's four-step process.
 */
export function ProcessTimeline() {
  const [active, setActive] = useState(PROCESS_STEPS[0].index);
  const activeStep = PROCESS_STEPS.find((s) => s.index === active) ?? PROCESS_STEPS[0];

  return (
    <section data-mode="light" className="relative bg-bg text-text py-20 md:py-32 border-b border-border overflow-hidden">
      <GradientMesh />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow mb-4">How We Work</p>
          <AnimatedHeading as="h2" className="heading-giant text-text">
            From first message to monthly report.
          </AnimatedHeading>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {PROCESS_STEPS.map((step) => (
            <button
              key={step.index}
              onClick={() => setActive(step.index)}
              data-cursor="hover"
              className={cn(
                "rounded-[var(--radius-pill)] border-2 px-5 py-2.5 text-sm font-semibold transition-colors",
                active === step.index
                  ? "border-text bg-[var(--color-text)] text-[var(--color-bg)]"
                  : "border-border text-text-2 hover:border-text hover:text-text",
              )}
            >
              {step.index} — {step.title}
            </button>
          ))}
        </div>

        <div className="corner-card-lg grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0 border border-border overflow-hidden">
          <div className="h-64 lg:h-auto">
            <ImageReveal alt={activeStep.title} placeholderVariant="ink" className="h-full w-full" />
          </div>
          <div className="relative p-8 md:p-12 bg-surface overflow-hidden min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: DURATION.fast }}
              >
                <span className="text-data text-accent-text text-lg font-semibold">{activeStep.index}</span>
                <h3 className="font-display text-h2 text-text mt-3 mb-5">{activeStep.title}</h3>
                <p className="text-body-lg text-text-2 leading-relaxed max-w-md">{activeStep.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

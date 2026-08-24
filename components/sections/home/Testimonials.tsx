"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { useStaggerReveal } from "@/animations/hooks";
import { TESTIMONIALS } from "@/data/testimonials";
import { cn } from "@/lib/utils/cn";

export function Testimonials() {
  const gridRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { budget: "calm" });
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { budget: "calm" });

  return (
    <SectionWrapper mode="light" motionBudget="calm">
      <div ref={headerRef} className="mb-14 max-w-4xl">
        <p data-reveal-item className="eyebrow mb-4">Client Results</p>
        <AnimatedHeading as="h2" className="heading-giant text-text">
          What brands say after working with us.
        </AnimatedHeading>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => {
          const isPending = t.quote.startsWith("TODO(client)");
          return (
            <figure
              key={t.clientCompany}
              data-reveal-item
              className="corner-card border border-border bg-surface p-8 flex flex-col gap-6"
            >
              <blockquote className={cn("font-display text-h4 leading-snug", isPending ? "text-text-2 italic" : "text-text")}>
                {isPending ? "Testimonial pending client sign-off on exact wording." : `“${t.quote}”`}
              </blockquote>
              <figcaption className="mt-auto flex items-center justify-between">
                <span className="text-sm font-semibold text-text">{t.clientCompany}</span>
                {isPending && <span className="text-small text-text-2 border border-border px-2 py-0.5">Pending</span>}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

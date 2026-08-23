import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import type { SectionMode } from "@/types";
import { cn } from "@/lib/utils/cn";

interface FeatureGridItem {
  title: string;
  description: string;
}

interface FeatureGridProps {
  eyebrow: string;
  heading: ReactNode;
  items: FeatureGridItem[];
  mode?: SectionMode;
  columns?: 3 | 4;
}

/** The hairline-divided card grid reused by WhyVelova, About's Values and anywhere else a set of parallel (non-sequential) points needs equal visual weight. */
export function FeatureGrid({ eyebrow, heading, items, mode = "light", columns = 4 }: FeatureGridProps) {
  return (
    <SectionWrapper mode={mode} motionBudget="calm">
      <div className="mb-14 max-w-4xl">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <AnimatedHeading as="h2" className="heading-giant text-text">
          {heading}
        </AnimatedHeading>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border",
          columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <div key={item.title} className="bg-bg p-8 flex flex-col gap-4">
            <span aria-hidden="true" className="w-8 h-px bg-accent" />
            <h3 className="font-display text-h4 text-text">{item.title}</h3>
            <p className="text-caption text-text-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

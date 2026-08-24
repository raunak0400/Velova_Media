"use client";

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StatCounter } from "@/components/motion/StatCounter";
import { useStaggerReveal } from "@/animations/hooks";
import { HOME_STATS } from "@/data/stats";

export function StatsBar() {
  const rowRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 20, stagger: 0.1 });

  return (
    <SectionWrapper mode="dark" motionBudget="standard" className="relative overflow-hidden !py-12 md:!py-16">
      <div ref={rowRef} className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 py-10">
        {HOME_STATS.map((stat) => (
          <div key={stat.label} data-reveal-item>
            <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} label={stat.label} />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StatCounter } from "@/components/motion/StatCounter";
import { HOME_STATS } from "@/data/stats";

export function StatsBar() {
  return (
    <SectionWrapper mode="dark" motionBudget="standard" className="relative overflow-hidden !py-12 md:!py-16">
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 py-10">
        {HOME_STATS.map((stat) => (
          <StatCounter key={stat.label} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} label={stat.label} />
        ))}
      </div>
    </SectionWrapper>
  );
}

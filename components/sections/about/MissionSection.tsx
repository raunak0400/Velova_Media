import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { MISSION } from "@/data/about";

export function MissionSection() {
  return (
    <SectionWrapper mode="light" motionBudget="calm">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
        <p className="eyebrow">{MISSION.eyebrow}</p>
        <div className="max-w-2xl">
          <AnimatedHeading as="h2" className="heading-giant text-text mb-6">
            {MISSION.heading}
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 leading-relaxed">{MISSION.body}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

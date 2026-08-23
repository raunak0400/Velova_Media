import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { TEAM_CREDENTIALS } from "@/data/about";

export function TeamCredentials() {
  return (
    <SectionWrapper mode="light" motionBudget="calm" className="!py-16 md:!py-24">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <p className="eyebrow mb-5">{TEAM_CREDENTIALS.eyebrow}</p>
        <AnimatedHeading as="h2" className="heading-giant text-text mb-6">
          {TEAM_CREDENTIALS.heading}
        </AnimatedHeading>
        <p className="text-body-lg text-text-2 leading-relaxed max-w-xl">{TEAM_CREDENTIALS.body}</p>
      </div>
    </SectionWrapper>
  );
}

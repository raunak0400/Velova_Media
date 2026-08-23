import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { STORY_PARAGRAPHS } from "@/data/about";

export function StorySection() {
  return (
    <SectionWrapper mode="light" motionBudget="standard">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow mb-4">Our Story</p>
          <AnimatedHeading as="h2" className="heading-giant text-text mb-8">
            Started in Ahmedabad. Never stayed small.
          </AnimatedHeading>
          <ImageReveal alt="Velova Media team at work" className="corner-card-lg aspect-[4/5]" placeholderVariant="ink" />
        </div>

        <div className="flex flex-col gap-6">
          {STORY_PARAGRAPHS.map((paragraph, i) => (
            <p key={i} className="text-body-lg text-text-2 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

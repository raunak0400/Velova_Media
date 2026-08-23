import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { CTASection } from "@/components/sections/CTASection";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";
import type { ServiceContent } from "@/data/services/content";
import type { ServiceSummary } from "@/data/services";

interface ServicePageTemplateProps {
  summary: ServiceSummary;
  content: ServiceContent;
}

/**
 * One template, two densities — the direct design expression of the SEO
 * Blueprint §1.1 positioning fork. Hero-tier services get the full
 * image-backed treatment; supporting-tier stays compact and text-led.
 * See Design Architecture §8/§17.
 */
export function ServicePageTemplate({ summary, content }: ServicePageTemplateProps) {
  const isHero = summary.tier === "hero";

  return (
    <>
      <section data-mode="light" className="bg-bg text-text pt-40 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">{isHero ? "Hero Service" : "Service"}</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl mb-6">
            {content.h1}
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-2xl mb-10 leading-relaxed">{content.heroSubheading}</p>
          <WhatsAppCTA message={WHATSAPP_MESSAGES.service(summary.cardTitle)} size="lg" />
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="standard">
        <div className={isHero ? "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" : "max-w-3xl"}>
          {isHero && (
            <ImageReveal alt={content.h1} className="corner-card-lg aspect-[4/5] lg:sticky lg:top-32" placeholderVariant="ember" />
          )}
          <div className="flex flex-col gap-6">
            {content.overview.map((paragraph, i) => (
              <p key={i} className="text-body-lg text-text-2 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper mode="dark" motionBudget="standard">
        <p className="eyebrow mb-4">What&apos;s Included</p>
        <h2 className="heading-giant text-text mb-14 max-w-2xl">
          Everything this service actually covers.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border border border-border">
          {content.whatsIncluded.map((item) => (
            <div key={item.title} className="bg-bg p-8 flex flex-col gap-3">
              <h3 className="font-display text-h4 text-text">{item.title}</h3>
              <p className="text-caption text-text-2 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper mode="light" motionBudget="calm">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="heading-giant text-text mb-14 max-w-2xl">
          Questions we get about {summary.navLabel.toLowerCase()}.
        </h2>
        <FAQAccordion items={content.faq} />
      </SectionWrapper>

      <CTASection
        heading={`Ready to talk about ${summary.navLabel}?`}
        whatsappMessage={WHATSAPP_MESSAGES.service(summary.cardTitle)}
      />
    </>
  );
}

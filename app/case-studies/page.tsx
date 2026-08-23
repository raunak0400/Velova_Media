import type { Metadata } from "next";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CaseStudyCard } from "@/components/content/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { CASE_STUDIES } from "@/data/case-studies";
import { ROUTES } from "@/constants/routes";

/** SEO Blueprint §6.6 — meta title/description/H1 used verbatim. */
export const metadata: Metadata = {
  title: "Case Studies | Velova Media — Digital Marketing Results",
  description:
    "See how Velova Media has grown brands across e-commerce, D2C, real estate and wellness — in India and internationally. Real strategy, real results.",
  alternates: { canonical: ROUTES.caseStudies },
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case Studies", path: ROUTES.caseStudies }])} />

      <section data-mode="light" className="bg-bg text-text pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">Case Studies</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl">
            Case Studies — Real Results for Real Brands
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-xl mt-6">
            Full write-ups are being published as clients confirm what they&apos;re comfortable sharing publicly —
            here&apos;s what we&apos;ve been working on.
          </p>
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="standard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </SectionWrapper>

      <CTASection heading="Want results like these for your brand?" />
    </>
  );
}

import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MissionSection } from "@/components/sections/about/MissionSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { TeamCredentials } from "@/components/sections/about/TeamCredentials";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { VALUES } from "@/data/about";
import { ROUTES } from "@/constants/routes";

/** SEO Blueprint §6.2 — meta title/description used verbatim. */
export const metadata: Metadata = {
  title: "About Velova Media — Trusted Digital Marketing Agency in Ahmedabad",
  description:
    "Learn about Velova Media, Ahmedabad's results-driven digital marketing agency serving brands across India and internationally. Our story, mission, values and team.",
  alternates: { canonical: ROUTES.about },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: ROUTES.about }])} />
      <AboutHero />
      <MissionSection />
      <FeatureGrid eyebrow="Our Values" heading="What doesn't change as we grow." items={VALUES} mode="light" columns={4} />
      <StorySection />
      <TeamCredentials />
      <CTASection heading="Ready to talk about your brand?" />
    </>
  );
}

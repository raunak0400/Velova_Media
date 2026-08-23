import type { Metadata } from "next";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ServiceCard } from "@/components/content/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { HERO_SERVICES, SUPPORTING_SERVICES } from "@/data/services";
import { ROUTES } from "@/constants/routes";

/**
 * Not a page the SEO Blueprint specifies directly (the blueprint links
 * straight to individual service pages from nav/footer) — added as a
 * genuine hub page, so its meta is written fresh rather than quoted, and
 * deliberately doesn't target "digital marketing agency Ahmedabad" itself
 * to avoid cannibalising the homepage's primary keyword.
 */
export const metadata: Metadata = {
  title: "Digital Marketing Services in Ahmedabad | Velova Media",
  description:
    "Meta Ads, SEO, Shopify, B2B lead generation and more — every service Velova Media runs for brands in Ahmedabad, across India and internationally.",
  alternates: { canonical: ROUTES.services },
};

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: ROUTES.services }])} />

      <section data-mode="light" className="bg-bg text-text pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">Services</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl">
            9 Services. One Agency.
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-xl mt-6">
            Meta Ads and Shopify are where we run deepest — every other service is built to the same standard.
          </p>
        </div>
      </section>

      <section data-mode="light" className="bg-bg py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-8">Hero Services</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section data-mode="light" className="bg-bg py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-8">Also Available</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORTING_SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTASection heading="Not sure which service you need?" body="Tell us what you're trying to grow, and we'll recommend where to start." />
    </>
  );
}

import type { Metadata } from "next";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { MarketCard } from "@/components/content/MarketCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { MARKETS } from "@/data/markets";
import { ROUTES } from "@/constants/routes";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";

/** SEO Blueprint §6.5 — meta title/description/H1 used verbatim. */
export const metadata: Metadata = {
  title: "International Digital Marketing Agency | India, USA, UK, Canada, Netherlands | Velova Media",
  description:
    "Velova Media runs Meta Ads, social media, SEO and Shopify programmes for brands across India, the USA, the UK, Canada and the Netherlands. One team, market-specific execution.",
  alternates: { canonical: ROUTES.markets },
};

export default function MarketsPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Markets", path: ROUTES.markets }])} />

      <section data-mode="light" className="bg-bg text-text pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">Markets We Serve</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl mb-8">
            Ahmedabad Roots. Global Reach.
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-2xl">
            We&apos;re based in Ahmedabad — and we run Meta Ads, social media, SEO and Shopify programmes for brands
            across India, the United States, the United Kingdom, Canada and the Netherlands. Same dedicated team,
            same transparent reporting, wherever your customers are.
          </p>
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="standard">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MARKETS.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
        <p className="text-body-lg text-text-2 mt-14 max-w-2xl">
          Every market gets the same dedicated-team model and transparent monthly reporting you&apos;d get as an
          Ahmedabad client — the strategy adapts to the market; the way we work with you doesn&apos;t.
        </p>
      </SectionWrapper>

      <CTASection
        eyebrow="Talk to Us About Your Market"
        heading="Ready to grow outside India?"
        whatsappMessage={WHATSAPP_MESSAGES.markets}
      />
    </>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/home/Hero";
import { StatsBar } from "@/components/sections/home/StatsBar";
import { ServicesShowcase } from "@/components/sections/home/ServicesShowcase";
import { WhyVelova } from "@/components/sections/home/WhyVelova";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { MarketsPreview } from "@/components/sections/home/MarketsPreview";
import { ProcessTimeline } from "@/components/sections/home/ProcessTimeline";
import { PlatformsStrip } from "@/components/sections/home/PlatformsStrip";
import { CTASection } from "@/components/sections/CTASection";
import { Marquee } from "@/components/motion/Marquee";
import { SERVICES } from "@/data/services";

/**
 * Code-split (not ssr:false) — the pinned/scrubbed ScrollTrigger setup in
 * these two sections is the heaviest client JS on the homepage, but their
 * real text content still has to exist in the server-rendered HTML (see
 * Design Architecture §12/§15), so SSR stays on; only the JS chunk is
 * split out of the main bundle.
 */
const PinnedStory = dynamic(() => import("@/components/sections/home/PinnedStory").then((m) => m.PinnedStory));
const CaseStudiesScroll = dynamic(() =>
  import("@/components/sections/home/CaseStudiesScroll").then((m) => m.CaseStudiesScroll),
);

/** SEO Blueprint §6.1 — meta title/description used verbatim. */
export const metadata: Metadata = {
  title: "Best Digital Marketing Agency in Ahmedabad | Velova Media",
  description:
    "Velova Media is Ahmedabad's full-service digital marketing agency — trusted by brands across India, the UK, USA, Canada & the Netherlands. Meta Ads, social, SEO, Shopify & more.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <WhyVelova />
      <ServicesShowcase />
      <PinnedStory />
      <ProcessTimeline />
      <CaseStudiesScroll />
      <StatsBar />
      <PlatformsStrip />
      <Testimonials />
      <MarketsPreview />
      <Marquee items={SERVICES.map((s) => s.navLabel.toUpperCase())} />
      <CTASection heading={<>Ready to grow a brand that means <span className="text-shine">business</span>?</>} />
    </>
  );
}

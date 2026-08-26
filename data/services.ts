import type { ServiceTier } from "@/types";

/**
 * Canonical slug/tier/order list for all 10 service pages — the single
 * source of truth the Navbar, Footer, homepage services grid and Phase 4's
 * full data/services/*.ts content files all read from, so ordering and
 * tier assignment can never drift between them.
 *
 * Tier assignment follows the SEO Blueprint §1.1 positioning
 * recommendation: keep all 10 pages (they're indexed, don't throw away
 * crawl equity) but make Meta Ads/Social, Shopify, SEO and B2B Lead Gen
 * the hero services in hierarchy and internal linking, with the rest
 * "also available."
 */
export interface ServiceSummary {
  slug: string;
  tier: ServiceTier;
  navLabel: string;
  cardTitle: string;
  cardSummary: string;
  /** Sub-service pills shown on the stacked "Our Services" panels (hero tier). */
  tags?: string[];
  /** Optional showcase video for the stacked panel's media area (added later per service). */
  videoSrc?: string;
}

export const SERVICES: ServiceSummary[] = [
  {
    slug: "social-media-management",
    tier: "hero",
    navLabel: "Meta Ads & Social",
    cardTitle: "Meta Ads & Social",
    cardSummary: "Instagram, Facebook and performance campaigns — the specialism our client history most directly supports.",
    tags: ["Meta Ads", "Instagram & Facebook", "Performance campaigns"],
  },
  {
    slug: "shopify-store-creation",
    tier: "hero",
    navLabel: "Shopify Development",
    cardTitle: "Shopify Store Creation",
    cardSummary: "Storefronts built for D2C brands selling into India, Europe and North America from day one.",
    tags: ["Storefront design", "D2C build", "Conversion optimisation"],
  },
  {
    slug: "seo",
    tier: "hero",
    navLabel: "SEO",
    cardTitle: "SEO",
    cardSummary: "Structured for classic rankings and the AI-search systems now sitting on top of them.",
    tags: ["Technical SEO", "AI search", "Content & copy"],
  },
  {
    slug: "b2b-lead-generation",
    tier: "hero",
    navLabel: "B2B Lead Generation",
    cardTitle: "B2B Lead Generation",
    cardSummary: "Click-to-WhatsApp campaigns and qualification funnels that start real conversations, not spreadsheets.",
    tags: ["Click-to-WhatsApp", "Lead funnels", "Qualification"],
  },
  {
    slug: "google-ads",
    tier: "supporting",
    navLabel: "Google Ads",
    cardTitle: "Google Ads",
    cardSummary: "Search, Display and Shopping campaigns managed by a certified team.",
  },
  {
    slug: "amazon-account-management",
    tier: "supporting",
    navLabel: "Amazon Management",
    cardTitle: "Amazon Account Management",
    cardSummary: "Listing optimisation, advertising and account health for Amazon sellers.",
  },
  {
    slug: "graphic-design",
    tier: "supporting",
    navLabel: "Graphic Design",
    cardTitle: "Graphic Design",
    cardSummary: "Brand identity and campaign design that holds up across every channel.",
  },
  {
    slug: "website-development",
    tier: "supporting",
    navLabel: "Website Development",
    cardTitle: "Website Development",
    cardSummary: "Fast, conversion-focused websites built on modern foundations.",
  },
  {
    slug: "product-photography",
    tier: "supporting",
    navLabel: "Product Photography",
    cardTitle: "Product Photography & Videography",
    cardSummary: "Studio and lifestyle content that makes a product page convert.",
  },
  {
    slug: "influencer-marketing",
    tier: "supporting",
    navLabel: "Influencer Marketing",
    cardTitle: "Influencer Marketing",
    cardSummary: "Creator partnerships matched to your category and market.",
  },
];

export const HERO_SERVICES = SERVICES.filter((s) => s.tier === "hero");
export const SUPPORTING_SERVICES = SERVICES.filter((s) => s.tier === "supporting");

export function getServiceSummary(slug: string): ServiceSummary | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

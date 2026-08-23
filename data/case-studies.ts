import type { CaseStudy } from "@/types";

/**
 * SEO Blueprint §6.6 is explicit that it did NOT write client-specific
 * challenge/results copy because that requires each client's sign-off on
 * what can be shared publicly — it provides a template, not filled content.
 * Respecting that: every field below marked TODO is intentionally withheld
 * pending permission, not invented. Only the engagement facts the blueprint
 * actually confirms (industry, market, which services were delivered) are
 * populated. See SEO Blueprint §6.6 and §10 (Case Studies sequenced as a
 * longer-term item, starting with the 2-3 clients most likely to permission).
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "netherlands-ecommerce-meta-ads-roadmap",
    clientLabel: "Netherlands-Based E-Commerce Brand",
    industry: "E-Commerce",
    market: "NL",
    challenge: "TODO(client): pending permission to share challenge detail publicly.",
    whatWeDid: ["Website & Shopify audit", "Meta Ads roadmap"],
    results: [],
    relatedServiceSlugs: ["shopify-store-creation", "social-media-management"],
    metaTitle: "Netherlands E-Commerce Brand — Website Audit & Meta Ads Roadmap",
    metaDescription: "How Velova Media approached a website audit and Meta Ads roadmap for a Netherlands-based e-commerce brand.",
  },
  {
    slug: "indian-d2c-jewellery-meta-ads-audit",
    clientLabel: "Indian D2C Jewellery Brand",
    industry: "Jewellery / D2C",
    market: "IN",
    challenge: "TODO(client): pending permission to share challenge detail publicly.",
    whatWeDid: ["Full Meta Ads account audit"],
    results: [],
    relatedServiceSlugs: ["social-media-management"],
    metaTitle: "Indian D2C Jewellery Brand — Full Meta Ads Account Audit",
    metaDescription: "How Velova Media audited the Meta Ads account of an Indian D2C jewellery brand.",
  },
  {
    slug: "wellness-brand-content-programme",
    clientLabel: "Wellness & Crystal Brand",
    industry: "Wellness / D2C",
    market: "IN",
    challenge: "TODO(client): pending permission to share challenge detail publicly.",
    whatWeDid: ["Ongoing content programme"],
    results: [],
    relatedServiceSlugs: ["social-media-management", "graphic-design"],
    metaTitle: "Wellness Brand — Ongoing Content Programme",
    metaDescription: "How Velova Media runs an ongoing content programme for a wellness and crystal brand.",
  },
  {
    slug: "real-estate-social-strategy",
    clientLabel: "Real Estate Project",
    industry: "Real Estate",
    market: "IN",
    challenge: "TODO(client): pending permission to share challenge detail publicly.",
    whatWeDid: ["Social media strategy", "Content calendar"],
    results: [],
    relatedServiceSlugs: ["social-media-management"],
    metaTitle: "Real Estate Project — Social Media Strategy & Content Calendar",
    metaDescription: "How Velova Media built a social media strategy and content calendar for a real estate project.",
  },
  {
    slug: "travel-brand-strategy-report",
    clientLabel: "Travel Brand",
    industry: "Travel",
    market: "IN",
    challenge: "TODO(client): pending permission to share challenge detail publicly.",
    whatWeDid: ["42-page brand strategy report"],
    results: [],
    relatedServiceSlugs: ["seo", "social-media-management"],
    metaTitle: "Travel Brand — Strategy Report",
    metaDescription: "How Velova Media put together a detailed strategy report for a travel brand.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

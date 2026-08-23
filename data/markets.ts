import type { Market } from "@/types";

/**
 * Verbatim from SEO Blueprint §6.5 (Markets We Serve). Do not rewrite —
 * this copy is the source of truth.
 */
export const MARKETS: Market[] = [
  {
    code: "IN",
    name: "India",
    isHome: true,
    note: "Our home market. Deep familiarity with Indian buyer behaviour, WhatsApp-first conversion patterns, and price-sensitive, offer-driven campaigns across metro and Tier-2 audiences.",
  },
  {
    code: "UK",
    name: "United Kingdom",
    isHome: false,
    note: "British-English copy and tone, trust-and-heritage cues that UK buyers respond to, and awareness of UK advertising standards (ASA/CAP) for ad and influencer content.",
  },
  {
    code: "US",
    name: "United States",
    isHome: false,
    note: "Bold, benefit-led creative and campaign structures built for a more competitive, higher-CPC market, with FTC disclosure requirements built into influencer and UGC work.",
  },
  {
    code: "CA",
    name: "Canada",
    isHome: false,
    note: "Balanced, polite tone with awareness of bilingual (English/French) considerations where relevant.",
  },
  {
    code: "NL",
    name: "Netherlands",
    isHome: false,
    note: "Direct, no-nonsense Dutch communication style, and compliance awareness for EU-specific requirements including the Omnibus Directive on influencer and advertising disclosure.",
  },
];

/**
 * SEO Blueprint §6.1 confirms the "Why Velova" cards already exist and work
 * well ("genuinely solid, no notes") but doesn't quote their body copy. The
 * headings are preserved from the blueprint exactly; the supporting lines
 * below are written fresh, grounded in facts the blueprint does confirm (a
 * dedicated team model, results-focused reporting) rather than invented
 * claims. Trimmed to three cards to match the three-column pillar layout.
 */
export interface WhyVelovaCard {
  title: string;
  description: string;
}

export const WHY_VELOVA: WhyVelovaCard[] = [
  {
    title: "Results-Driven",
    description: "Every campaign is built around a number that matters to your business, not a vanity metric that looks good in a slide.",
  },
  {
    title: "Full-Service",
    description: "Nine services under one roof — Meta Ads, SEO, Shopify and more work together instead of being handed off between agencies.",
  },
  {
    title: "Dedicated Team",
    description: "A real team that knows your account, not a rotating pool of freelancers picking up tickets.",
  },
];

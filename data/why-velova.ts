/**
 * SEO Blueprint §6.1 confirms these four "Why Velova" cards already exist
 * and work well ("genuinely solid, no notes") but doesn't quote their body
 * copy. The four headings are preserved from the blueprint exactly; the
 * supporting lines below are written fresh, grounded in facts the
 * blueprint does confirm (transparent ₹ pricing in FAQs, a dedicated team
 * model, WhatsApp-first reporting) rather than invented claims.
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
  {
    title: "Transparent Reporting",
    description: "Monthly reporting in plain numbers, and ₹ pricing you can see upfront before you ever get on a call.",
  },
];

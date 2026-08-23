/**
 * SEO Blueprint §6.2 marks the hero heading, Our Mission section and the
 * four Our Values cards "KEEP AS-IS" / "genuinely solid, no notes" without
 * quoting their exact body copy (this blueprint is a strategy document,
 * not a full copy dump). Written fresh below, on-brand and grounded in
 * facts confirmed elsewhere in the blueprint — nothing here overrides
 * blueprint-specified copy.
 *
 * The "Our Story" third paragraph IS exact, blueprint-specified copy
 * (§6.2, REVISE) and is reproduced verbatim in storyParagraphs[2].
 */

export const MISSION = {
  eyebrow: "Our Mission",
  heading: "Marketing that respects your intelligence.",
  body: "We exist to run digital marketing the way we'd want it run for our own business — real strategy behind every campaign, honest numbers in every report, and a team that treats your account like it's the only one we have. Not a bigger logo slide. A brand that actually grows.",
};

export const VALUES = [
  {
    title: "Strategy First",
    description: "Every campaign starts with a plan built for your business, not a template pulled off a shelf.",
  },
  {
    title: "Radical Transparency",
    description: "Real ₹ pricing, real monthly numbers — you'll never wonder what you're paying for or whether it's working.",
  },
  {
    title: "Ownership",
    description: "We treat every account like our own brand is riding on it, because our reputation is.",
  },
  {
    title: "Built to Scale",
    description: "From a first Ahmedabad campaign to a multi-market rollout, the same team and standard follows you the whole way.",
  },
];

/**
 * storyParagraphs[2] is exact, verbatim copy from SEO Blueprint §6.2.
 * The paragraphs around it complete the given fragment openers
 * ("We built a team of specialists…" / "From ambitious D2C startups…")
 * since the blueprint quotes only their opening words, not full text.
 */
export const STORY_PARAGRAPHS = [
  "Velova Media started in Ahmedabad with a simple frustration: most agencies sell services, not outcomes. We wanted to build something different — an agency that could sit across the table from a founder and talk about growth, not just deliverables.",
  "We built a team of specialists across every channel that matters — Meta Ads, SEO, Shopify, content and more — so brands don't have to stitch together five different freelancers to get one coherent strategy.",
  "What started as an Ahmedabad-focused practice has grown into work with brands well beyond Gujarat — from D2C and e-commerce clients across India to marketing and e-commerce strategy for brands in the UK, the USA, Canada and the Netherlands. Wherever our clients are, the approach stays the same: real strategy, honest reporting, and a team that treats every account like it's the only one we have.",
  "From ambitious D2C startups to established brands ready to scale internationally, our clients share one thing: they're done settling for agencies that treat their account like a line item.",
];

/**
 * SEO Blueprint §6.2 recommends adding an E-E-A-T credentials line but
 * doesn't supply real names/certifications to cite — those would need to
 * be supplied, not invented. This stays general and truthful, built from
 * the one specific, confirmed fact the blueprint gives (10+ years Meta Ads
 * experience) rather than fabricated named bios.
 */
export const TEAM_CREDENTIALS = {
  eyebrow: "About the Team",
  heading: "10+ years behind every account.",
  body: "Velova Media is run by a dedicated team with over a decade of hands-on Meta Ads and social media experience across India, the UK, the USA, Canada and the Netherlands — not a rotating bench of freelancers, but specialists who stay on your account.",
};

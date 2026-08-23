import type { FAQItem } from "@/types";

/**
 * Built from the exact same data the visible Accordion renders — schema
 * and visible copy can never drift apart. See SEO Blueprint §7.1 and
 * Design Architecture §8/§15.
 */
export function buildFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

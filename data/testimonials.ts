import type { Testimonial } from "@/types";

/**
 * SEO Blueprint §2.2 confirms these three testimonials already exist on the
 * live site (real client names) but doesn't quote their exact wording —
 * this blueprint is a strategy document, not a copy dump of the current
 * site. Rather than inventing replacement quotes, the real quote text is
 * marked TODO here pending copy-paste from the live site plus (per the
 * blueprint's own recommendation) a linked case study and logo for each.
 * Do not ship fabricated quote text in place of these.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "TODO(client): paste the existing verbatim testimonial from the live site.",
    clientName: "Bloom Skincare",
    clientCompany: "Bloom Skincare",
  },
  {
    quote: "TODO(client): paste the existing verbatim testimonial from the live site.",
    clientName: "FastFit Equipment",
    clientCompany: "FastFit Equipment",
  },
  {
    quote: "TODO(client): paste the existing verbatim testimonial from the live site.",
    clientName: "Artisan Co.",
    clientCompany: "Artisan Co.",
  },
];

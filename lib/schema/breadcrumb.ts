import { BUSINESS } from "@/constants/business";

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/** Rendered on every interior page per SEO Blueprint §7.1. */
export function buildBreadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${BUSINESS.url}${entry.path}`,
    })),
  };
}

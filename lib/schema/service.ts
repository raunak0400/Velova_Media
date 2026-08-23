import { BUSINESS } from "@/constants/business";
import type { ServiceContent } from "@/data/services/content";

/** One per service page, per SEO Blueprint §7.1. */
export function buildServiceSchema(content: ServiceContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.h1,
    description: content.metaDescription,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
      url: BUSINESS.url,
    },
    areaServed: ["IN", "GB", "US", "CA", "NL"],
    url: `${BUSINESS.url}/services/${content.slug}`,
  };
}

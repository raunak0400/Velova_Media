import { BUSINESS } from "@/constants/business";

/**
 * Requires the visible NAP block in the footer (SEO Blueprint §6.7/§7.1) —
 * both read from the same constants/business.ts fact base by construction.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BUSINESS.url}/#localbusiness`,
    name: BUSINESS.name,
    description: BUSINESS.foundingDescription,
    url: BUSINESS.url,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.linkedin],
    areaServed: ["IN", "GB", "US", "CA", "NL"],
  };
}

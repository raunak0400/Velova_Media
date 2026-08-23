import { BUSINESS } from "@/constants/business";

/**
 * Rendered once in the root layout. Sources every fact from
 * constants/business.ts so it can't drift from the visible footer NAP.
 * See SEO Blueprint §7.1 and Design Architecture §15.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    description: BUSINESS.foundingDescription,
    email: BUSINESS.email,
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.linkedin],
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
  };
}

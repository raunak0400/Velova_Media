/**
 * Single source of truth for every business fact that appears in more than
 * one place (footer NAP, WhatsApp CTAs, LocalBusiness/Organization schema).
 * Centralised here specifically so NAP consistency can't drift between the
 * visible page and structured data — see SEO Blueprint §7.2 and
 * Velova_Media_Design_Architecture.md §9.
 *
 * TODO(client): every value marked TODO below is a placeholder. Real values
 * must be supplied before this ships — LocalBusiness schema and the footer
 * NAP block both read directly from this file, so an unfilled placeholder
 * will render as literal placeholder text/an inert WhatsApp link in production.
 */

export const BUSINESS = {
  name: "Velova Media",
  legalName: "Velova Media",
  tagline: "Where Brands Starts to Shine",
  foundingDescription: "Digital marketing agency in Ahmedabad, Gujarat, serving brands across India, the UK, the USA, Canada and the Netherlands.",

  // TODO(client): replace with the real registered office address.
  address: {
    streetAddress: "TODO — add full street address",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "TODO — add PIN code",
    addressCountry: "IN",
  },

  // TODO(client): replace with the real, monitored WhatsApp Business number (E.164 format, no spaces).
  whatsappNumber: "91TODOTODOTO",
  // TODO(client): replace with the real public contact number (may be the same as WhatsApp).
  phoneDisplay: "+91 TODO TODO TODO",
  email: "hello@velovamedia.com",

  social: {
    instagram: "https://instagram.com/velovamedia",
    linkedin: "https://linkedin.com/company/velovamedia",
  },

  url: "https://velovamedia.com",
} as const;

export const MARKETS_SERVED = ["IN", "UK", "US", "CA", "NL"] as const;

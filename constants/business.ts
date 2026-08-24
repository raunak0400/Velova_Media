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

  address: {
    streetAddress: "Park Avenue, 9, Opposite Neelkanth Bungalows, Near Gulab Tower Road, Shenbhai Nagar",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380052",
    addressCountry: "IN",
  },

  whatsappNumber: "916354989658",
  phoneDisplay: "+91 63549 89658",
  email: "hello@velovamedia.com",

  social: {
    instagram: "https://instagram.com/velovamedia",
    linkedin: "https://linkedin.com/company/velovamedia",
  },

  url: "https://velovamedia.com",
} as const;

export const MARKETS_SERVED = ["IN", "UK", "US", "CA", "NL"] as const;

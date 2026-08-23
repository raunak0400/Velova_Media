export const ROUTES = {
  home: "/",
  about: "/about",
  services: "/services",
  markets: "/markets",
  caseStudies: "/case-studies",
  blog: "/blog",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms",
} as const;

export const service = (slug: string) => `/services/${slug}`;
export const caseStudy = (slug: string) => `/case-studies/${slug}`;
export const blogPost = (slug: string) => `/blog/${slug}`;

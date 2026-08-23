export interface FAQItem {
  question: string;
  answer: string;
}

export type ServiceTier = "hero" | "supporting";

export interface ServiceWhatIncluded {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  tier: ServiceTier;
  navLabel: string;
  primaryKeyword: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  overview: string[];
  whatsIncluded: ServiceWhatIncluded[];
  faq: FAQItem[];
  cardSummary: string;
}

export interface Market {
  code: "IN" | "UK" | "US" | "CA" | "NL";
  name: string;
  isHome: boolean;
  note: string;
}

export interface Testimonial {
  quote: string;
  clientName: string;
  clientCompany: string;
  market?: Market["code"];
  stat?: string;
  caseStudySlug?: string;
}

export interface CaseStudyResult {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  clientLabel: string;
  industry: string;
  market: Market["code"];
  challenge: string;
  whatWeDid: string[];
  results: CaseStudyResult[];
  pullQuote?: string;
  relatedServiceSlugs: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  targetKeyword: string;
  angle: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface SEOMeta {
  primaryKeyword: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export type MotionBudget = "cinematic" | "standard" | "calm";
export type SectionMode = "dark" | "light";

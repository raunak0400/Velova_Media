/**
 * The SEO Blueprint's own stat bar spec ("9+ Services / [X]+ Brands Served
 * / [X]x Avg. Growth", §2.2/§6.1) explicitly warns that a placeholder or
 * fabricated number here is worse than not having it. We don't have real
 * "brands served" or "avg. growth" figures, so rather than inventing them,
 * this substitutes two facts the blueprint DOES confirm as real and
 * currently under-used on the live site (§ Executive Summary: "10+ years
 * running Meta Ads and social... mentioned almost nowhere on your own
 * site"): the years of Meta Ads experience and the number of markets
 * served. Swap in real "brands served" / "avg. growth" figures once
 * available — see constants/business.ts for the same TODO pattern.
 */
export interface HomeStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const HOME_STATS: HomeStat[] = [
  { value: 9, suffix: "+", label: "Services, one agency" },
  { value: 10, suffix: "+", label: "Years running Meta Ads & social" },
  { value: 5, suffix: "", label: "Markets served worldwide" },
];

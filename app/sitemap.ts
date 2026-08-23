import type { MetadataRoute } from "next";
import { BUSINESS } from "@/constants/business";
import { ROUTES, service, caseStudy, blogPost } from "@/constants/routes";
import { SERVICES } from "@/data/services";
import { CASE_STUDIES } from "@/data/case-studies";
import { BLOG_POSTS } from "@/data/blog";

/**
 * A typed route handler rather than a static file, so new service /
 * case-study / blog slugs are picked up automatically from the data layer
 * — the exact kind of drift SEO Blueprint §7.3 warns against (new pages
 * shipped but never submitted). See Design Architecture §15.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BUSINESS.url}${ROUTES.home}`, changeFrequency: "weekly", priority: 1 },
    { url: `${BUSINESS.url}${ROUTES.about}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BUSINESS.url}${ROUTES.services}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BUSINESS.url}${ROUTES.markets}`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BUSINESS.url}${ROUTES.caseStudies}`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BUSINESS.url}${ROUTES.blog}`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BUSINESS.url}${ROUTES.contact}`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BUSINESS.url}${service(s.slug)}`,
    changeFrequency: "monthly",
    priority: s.tier === "hero" ? 0.9 : 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${BUSINESS.url}${caseStudy(c.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.filter((p) => p.body.length > 0).map((p) => ({
    url: `${BUSINESS.url}${blogPost(p.slug)}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}

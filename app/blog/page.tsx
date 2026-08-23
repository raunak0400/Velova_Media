import type { Metadata } from "next";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BlogCard } from "@/components/content/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { BLOG_POSTS } from "@/data/blog";
import { ROUTES } from "@/constants/routes";

/** Not directly specified by the SEO Blueprint (§5/§9 call for the section without dictating its own meta). */
export const metadata: Metadata = {
  title: "Blog | Digital Marketing Insights from Velova Media",
  description: "Practical guides on Meta Ads, SEO, Shopify and B2B lead generation from Velova Media's Ahmedabad-based team.",
  alternates: { canonical: ROUTES.blog },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: ROUTES.blog }])} />

      <section data-mode="light" className="bg-bg text-text pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">Blog</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl">
            Digital Marketing Insights
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-xl mt-6">
            Practical guides on Meta Ads, SEO, Shopify and B2B lead generation — written by the team that runs them.
          </p>
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="calm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

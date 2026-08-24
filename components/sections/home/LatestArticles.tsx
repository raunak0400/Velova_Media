"use client";

import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { BlogCard } from "@/components/content/BlogCard";
import { Button } from "@/components/ui/Button";
import { useStaggerReveal } from "@/animations/hooks";
import { BLOG_POSTS } from "@/data/blog";
import { ROUTES } from "@/constants/routes";

/**
 * kota.co.uk's "Latest articles": a black section holding a grid of
 * light-surfaced cards — the section flips to dark register while the
 * card grid stays pinned to the light one (nested data-mode, see the
 * "Runtime color tokens" note atop globals.css). Published posts sort
 * first so the real article isn't buried behind "coming soon" cards.
 */
const HOME_ARTICLES = [...BLOG_POSTS].sort((a, b) => (b.body.length > 0 ? 1 : 0) - (a.body.length > 0 ? 1 : 0)).slice(0, 6);

export function LatestArticles() {
  const gridRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]");
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { stagger: 0.08 });

  return (
    <section data-mode="dark" className="relative bg-bg text-text py-20 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div ref={headerRef} className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div data-reveal-item className="max-w-2xl">
            <p className="eyebrow mb-4">From The Blog</p>
            <AnimatedHeading as="h2" className="heading-giant text-text">
              Latest Articles
            </AnimatedHeading>
          </div>
          <span data-reveal-item>
            <Button variant="secondary" href={ROUTES.blog}>
              View our blog
            </Button>
          </span>
        </div>

        <div ref={gridRef} data-mode="light" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOME_ARTICLES.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

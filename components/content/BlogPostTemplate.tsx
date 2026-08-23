import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { CTASection } from "@/components/sections/CTASection";
import type { BlogPost } from "@/types";

interface BlogPostTemplateProps {
  post: BlogPost;
}

export function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  const isPublished = post.body.length > 0;

  return (
    <>
      <section data-mode="light" className="bg-bg text-text pt-40 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 max-w-3xl">
          <p className="eyebrow mb-6">Blog</p>
          <AnimatedHeading as="h1" trigger="load" className="text-h1 font-medium text-text mb-6">
            {post.title}
          </AnimatedHeading>
          <p className="text-body-lg text-text-2">{post.excerpt}</p>
          {isPublished && (
            <p className="text-caption text-text-2 mt-6">
              {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="calm">
        <div className="max-w-2xl mx-auto">
          {isPublished ? (
            <div className="flex flex-col gap-6">
              {post.body.map((paragraph, i) => (
                <p key={i} className="text-body-lg text-text-2 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-body-lg text-text-2 italic text-center py-16">
              This article is on our content roadmap and coming soon. In the meantime, message us on WhatsApp if you&apos;d
              like to talk about {post.targetKeyword} directly.
            </p>
          )}
        </div>
      </SectionWrapper>

      <CTASection heading="Have a question this article didn't answer?" />
    </>
  );
}

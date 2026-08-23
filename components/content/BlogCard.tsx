import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPost } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  const isPublished = post.body.length > 0;

  const content = (
    <>
      <p className="eyebrow mb-3">{isPublished ? "Article" : "Coming Soon"}</p>
      <h3 className="font-display text-h4 text-text mb-3">{post.title}</h3>
      <p className="text-caption text-text-2 leading-relaxed mb-6">{post.excerpt}</p>
      {isPublished && (
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
          Read article
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  );

  const cardClasses = cn(
    "corner-card group flex flex-col p-8 border border-border bg-surface transition-colors",
    isPublished ? "hover:border-accent-text" : "opacity-70",
    className,
  );

  if (!isPublished) {
    return (
      <div className={cardClasses} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link href={blogPost(post.slug)} data-cursor="hover" className={cardClasses}>
      {content}
    </Link>
  );
}

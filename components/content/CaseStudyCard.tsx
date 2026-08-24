"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { useParallax } from "@/animations/hooks";
import { caseStudy } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  study: CaseStudy;
  className?: string;
}

export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
  const mediaRef = useParallax<HTMLDivElement>({ depth: 10 });

  return (
    <Link
      href={caseStudy(study.slug)}
      data-cursor="hover"
      data-reveal-item
      className={cn("corner-card-lg group flex flex-col overflow-hidden border border-border bg-surface hover:border-accent-text transition-colors", className)}
    >
      <div className="relative h-56 overflow-hidden">
        <div ref={mediaRef} className="absolute inset-x-0 -top-[15%] h-[130%]">
          <ImageReveal alt={study.clientLabel} className="h-full w-full" placeholderVariant="ink" />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <p className="eyebrow">
          {study.market} &middot; {study.industry}
        </p>
        <h3 className="font-display text-h4 text-text">{study.clientLabel}</h3>
        <ul className="flex flex-wrap gap-2 mt-auto">
          {study.whatWeDid.map((item) => (
            <li key={item} className="text-small text-text-2 border border-border px-2.5 py-1">
              {item}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
          View case study
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

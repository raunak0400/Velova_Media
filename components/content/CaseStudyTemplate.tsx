import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { service } from "@/constants/routes";
import type { CaseStudy } from "@/types";

interface CaseStudyTemplateProps {
  study: CaseStudy;
}

/**
 * SEO Blueprint §6.6 template: Client & Industry → The Challenge → What We
 * Did → The Results → Pull-quote. The blueprint explicitly withheld
 * challenge/results copy pending client sign-off (see data/case-studies.ts)
 * — this template renders that honestly rather than showing fabricated
 * prose or a raw "TODO" string to visitors.
 */
export function CaseStudyTemplate({ study }: CaseStudyTemplateProps) {
  const challengePending = study.challenge.startsWith("TODO(client)");

  return (
    <>
      <section data-mode="light" className="bg-bg text-text pt-40 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">
            {study.market} &middot; {study.industry}
          </p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl">
            {study.clientLabel}
          </AnimatedHeading>
        </div>
      </section>

      <SectionWrapper mode="dark" motionBudget="standard">
        <ImageReveal alt={study.clientLabel} className="corner-card-lg aspect-[16/7] mb-16" placeholderVariant="ember" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">The Challenge</p>
            {challengePending ? (
              <p className="text-body-lg text-text-2 leading-relaxed italic">
                Full write-up coming soon — pending client sign-off on what can be shared publicly.
              </p>
            ) : (
              <p className="text-body-lg text-text-2 leading-relaxed">{study.challenge}</p>
            )}
          </div>
          <div>
            <p className="eyebrow mb-4">What We Did</p>
            <ul className="flex flex-col gap-3">
              {study.whatWeDid.map((item) => (
                <li key={item} className="text-body-lg text-text-2 leading-relaxed flex gap-3">
                  <span aria-hidden="true" className="text-accent-text">
                    &middot;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {study.results.length > 0 && (
          <div className="mt-16">
            <p className="eyebrow mb-6">The Results</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {study.results.map((r) => (
                <div key={r.label}>
                  <p className="text-data font-mono text-accent-text text-3xl">{r.value}</p>
                  <p className="text-caption text-text-2 mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {study.pullQuote && (
          <blockquote className="font-display text-h3 text-text mt-16 max-w-3xl">{study.pullQuote}</blockquote>
        )}
      </SectionWrapper>

      <SectionWrapper mode="light" motionBudget="calm">
        <p className="eyebrow mb-4">Related Services</p>
        <div className="flex flex-wrap gap-4">
          {study.relatedServiceSlugs.map((slug) => (
            <Link
              key={slug}
              href={service(slug)}
              data-cursor="hover"
              className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-text hover:border-accent-text hover:text-accent-text transition-colors"
            >
              {slug.replace(/-/g, " ")}
              <ArrowUpRight size={15} />
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}

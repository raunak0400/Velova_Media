import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyTemplate } from "@/components/content/CaseStudyTemplate";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { ROUTES, caseStudy } from "@/constants/routes";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: caseStudy(slug) },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: ROUTES.caseStudies },
          { name: study.clientLabel, path: caseStudy(slug) },
        ])}
      />
      <CaseStudyTemplate study={study} />
      <CTASection heading="Want to be our next case study?" />
    </>
  );
}

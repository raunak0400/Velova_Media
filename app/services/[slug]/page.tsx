import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/content/ServicePageTemplate";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceSchema } from "@/lib/schema/service";
import { buildFAQSchema } from "@/lib/schema/faq";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { SERVICES, getServiceSummary } from "@/data/services";
import { SERVICE_CONTENT, getServiceContent } from "@/data/services/content";
import { ROUTES, service } from "@/constants/routes";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (!content) return {};

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: service(slug) },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const summary = getServiceSummary(slug);
  const content = getServiceContent(slug);

  if (!summary || !content) notFound();

  return (
    <>
      <JsonLd
        data={[
          buildServiceSchema(content),
          buildFAQSchema(content.faq),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: ROUTES.services },
            { name: summary.navLabel, path: service(slug) },
          ]),
        ]}
      />
      <ServicePageTemplate summary={summary} content={content} />
    </>
  );
}

// Ensure every service slug has matching content at build time.
if (SERVICES.length !== SERVICE_CONTENT.length) {
  throw new Error("data/services.ts and data/services/content.ts have drifted out of sync.");
}

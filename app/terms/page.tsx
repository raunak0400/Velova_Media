import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BUSINESS } from "@/constants/business";
import { ROUTES } from "@/constants/routes";

/**
 * Not specified by the SEO Blueprint (legal pages sit outside its scope).
 * Standard boilerplate — not a substitute for review by a qualified
 * lawyer before launch.
 */
export const metadata: Metadata = {
  title: "Terms of Service | Velova Media",
  description: "The terms that govern use of the Velova Media website and services.",
  alternates: { canonical: ROUTES.terms },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <SectionWrapper mode="light" motionBudget="calm" className="pt-40 md:pt-48">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-h1 font-medium text-text mb-4">Terms of Service</h1>
        <p className="text-caption text-text-2 mb-12">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="flex flex-col gap-10 text-body text-text-2 leading-relaxed [&_h2]:font-display [&_h2]:text-h4 [&_h2]:text-text [&_h2]:mb-3 [&_p]:mb-3">
          <section>
            <h2>1. Agreement</h2>
            <p>By using {BUSINESS.url}, you agree to these terms. If you don&apos;t agree, please don&apos;t use the site.</p>
          </section>

          <section>
            <h2>2. Website use</h2>
            <p>The content on this website — including copy, design and imagery — belongs to {BUSINESS.name} unless otherwise noted, and may not be reproduced without permission.</p>
          </section>

          <section>
            <h2>3. Services</h2>
            <p>Enquiries submitted through this site or via WhatsApp don&apos;t create a service agreement on their own. Any paid engagement is governed by a separate proposal or contract agreed directly between {BUSINESS.name} and the client.</p>
          </section>

          <section>
            <h2>4. No guaranteed results</h2>
            <p>Digital marketing outcomes depend on many factors outside our direct control, including platform algorithm changes and market conditions. We don&apos;t guarantee specific rankings, traffic or revenue figures on the website or in a general enquiry — specific commitments, where made, are set out in a signed service agreement.</p>
          </section>

          <section>
            <h2>5. Limitation of liability</h2>
            <p>{BUSINESS.name} is not liable for indirect or consequential loss arising from use of this website, to the extent permitted by applicable law.</p>
          </section>

          <section>
            <h2>6. Governing law</h2>
            <p>These terms are governed by the laws of India, with the courts of {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion} having jurisdiction.</p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>Questions about these terms can be sent to {BUSINESS.email}.</p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

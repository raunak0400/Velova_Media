import type { Metadata } from "next";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { BUSINESS } from "@/constants/business";
import { ROUTES } from "@/constants/routes";

/**
 * Not specified by the SEO Blueprint (legal pages sit outside its scope).
 * Standard boilerplate reflecting what this site actually does — contact
 * form, WhatsApp links, analytics/ad-pixel tracking per Blueprint §7.4 —
 * not a substitute for review by a qualified lawyer before launch.
 */
export const metadata: Metadata = {
  title: "Privacy Policy | Velova Media",
  description: "How Velova Media collects, uses and protects your information.",
  alternates: { canonical: ROUTES.privacy },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <SectionWrapper mode="light" motionBudget="calm" className="pt-40 md:pt-48">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="font-display text-h1 font-medium text-text mb-4">Privacy Policy</h1>
        <p className="text-caption text-text-2 mb-12">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="flex flex-col gap-10 text-body text-text-2 leading-relaxed [&_h2]:font-display [&_h2]:text-h4 [&_h2]:text-text [&_h2]:mb-3 [&_p]:mb-3">
          <section>
            <h2>1. Who we are</h2>
            <p>
              {BUSINESS.name} ({BUSINESS.foundingDescription}) operates {BUSINESS.url}. This policy explains what
              information we collect when you visit our site or get in touch, and how we use it.
            </p>
          </section>

          <section>
            <h2>2. Information we collect</h2>
            <p>When you contact us through our website form or WhatsApp, we collect the information you provide directly — typically your name, email address, phone number and details about your business or enquiry.</p>
            <p>We also use standard web analytics (Google Analytics) and advertising pixels (Meta Pixel) to understand site traffic and measure the performance of our own marketing campaigns. These tools may collect device information, pages visited and general location data.</p>
          </section>

          <section>
            <h2>3. How we use your information</h2>
            <p>We use the information you provide to respond to enquiries, prepare proposals, and — with your separate agreement — deliver services. We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>Our site uses cookies for analytics and advertising measurement. You can control cookies through your browser settings; disabling them may affect how the site functions.</p>
          </section>

          <section>
            <h2>5. Data retention</h2>
            <p>We retain contact and enquiry information for as long as reasonably necessary to respond to your enquiry or, where you become a client, for the duration of our engagement and as required by applicable law.</p>
          </section>

          <section>
            <h2>6. Your rights</h2>
            <p>You can ask us to access, correct or delete the personal information we hold about you at any time by contacting us at {BUSINESS.email}.</p>
          </section>

          <section>
            <h2>7. Contact</h2>
            <p>
              Questions about this policy can be sent to {BUSINESS.email} or to our registered address in{" "}
              {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion}, India.
            </p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}

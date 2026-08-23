import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContactForm } from "@/components/content/ContactForm";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { buildFAQSchema } from "@/lib/schema/faq";
import { BUSINESS } from "@/constants/business";
import { ROUTES } from "@/constants/routes";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";

/**
 * Primary keyword per SEO Blueprint §4.1: "hire digital marketing agency
 * Ahmedabad". No explicit SEO META DATA block is given for this page in
 * the blueprint, so H1/title/description are constructed to match the
 * pattern used on pages that do have one.
 */
export const metadata: Metadata = {
  title: "Contact Velova Media | Digital Marketing Agency Ahmedabad",
  description:
    "Get in touch with Velova Media — Ahmedabad's digital marketing agency serving brands across India and internationally. WhatsApp us or send a message.",
  alternates: { canonical: ROUTES.contact },
};

/**
 * FAQ content per SEO Blueprint §6.7: confirms the international-reach
 * FAQ answer should exist here (and to check whether it had actually
 * shipped on the live site). Written to match the confirmed 5-market list
 * used consistently elsewhere on this site rather than the blueprint's
 * looser "UK, USA, Canada, Europe" phrasing.
 */
const CONTACT_FAQ = [
  {
    question: "Do you only work with businesses in Ahmedabad?",
    answer:
      "No — while we're based in Ahmedabad and work with businesses across Gujarat and India, we also manage digital marketing for clients internationally, including the UK, the USA, Canada and the Netherlands.",
  },
  {
    question: "What happens after I send a message?",
    answer: "We'll reply within one business day, usually with a few questions before recommending next steps — never a generic sales pitch.",
  },
  {
    question: "Is WhatsApp or the contact form faster?",
    answer: "WhatsApp — it's how most of our clients prefer to reach us, and it's the fastest way to get a same-day reply.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: ROUTES.contact }]),
          buildFAQSchema(CONTACT_FAQ),
        ]}
      />

      <section data-mode="light" className="bg-bg text-text pt-40 pb-16 md:pt-48 md:pb-20 border-b border-border">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
          <p className="eyebrow mb-6">Contact</p>
          <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-4xl mb-6">
            Hire a Digital Marketing Agency in Ahmedabad
          </AnimatedHeading>
          <p className="text-body-lg text-text-2 max-w-xl mb-8">
            Tell us about your brand, or skip the form and message us directly on WhatsApp.
          </p>
          <WhatsAppCTA message={WHATSAPP_MESSAGES.general} size="lg" />
        </div>
      </section>

      <SectionWrapper mode="light" motionBudget="standard">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <MapPin size={20} className="text-accent-text shrink-0 mt-1" />
              <address className="not-italic text-body text-text-2 leading-relaxed">
                {BUSINESS.address.streetAddress}
                <br />
                {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion} {BUSINESS.address.postalCode}
                <br />
                India
              </address>
            </div>
            <div className="flex gap-4">
              <Phone size={20} className="text-accent-text shrink-0 mt-1" />
              <a href={`tel:${BUSINESS.phoneDisplay.replace(/\s+/g, "")}`} className="text-body text-text-2 hover:text-accent-text transition-colors">
                {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-accent-text shrink-0 mt-1" />
              <a href={`mailto:${BUSINESS.email}`} className="text-body text-text-2 hover:text-accent-text transition-colors">
                {BUSINESS.email}
              </a>
            </div>
          </div>

          <ContactForm />
        </div>
      </SectionWrapper>

      <SectionWrapper mode="light" motionBudget="calm">
        <p className="eyebrow mb-4">FAQ</p>
        <h2 className="heading-giant text-text mb-14 max-w-2xl">Before you reach out.</h2>
        <FAQAccordion items={CONTACT_FAQ} />
      </SectionWrapper>
    </>
  );
}

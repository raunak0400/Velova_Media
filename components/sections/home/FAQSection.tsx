import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { FAQAccordion } from "@/components/content/FAQAccordion";
import { HOME_FAQ } from "@/data/faqs";

/**
 * kota.co.uk closes its homepage with a plain, unhurried FAQ block on a
 * black section — giant "FAQ's" heading, no imagery, no gradient mesh,
 * six questions with a rotating "+" toggle. Reused verbatim here with
 * Velova's own agency-level questions (see data/faqs.ts).
 */
export function FAQSection() {
  return (
    <section data-mode="dark" className="relative bg-bg text-text py-20 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="mb-14 max-w-3xl">
          <p className="eyebrow mb-4">Questions</p>
          <AnimatedHeading as="h2" className="heading-giant text-text">
            FAQs
          </AnimatedHeading>
        </div>

        <FAQAccordion items={HOME_FAQ} />
      </div>
    </section>
  );
}

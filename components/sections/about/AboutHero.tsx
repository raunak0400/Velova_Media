import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

/** SEO Blueprint §6.2 — H1 tag used verbatim. */
export function AboutHero() {
  return (
    <section data-mode="light" className="bg-bg text-text pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <p className="eyebrow mb-6">About Velova Media</p>
        <AnimatedHeading as="h1" trigger="load" className="heading-giant text-text max-w-5xl">
          About Velova Media — Built for Brands That Refuse to Blend In
        </AnimatedHeading>
      </div>
    </section>
  );
}

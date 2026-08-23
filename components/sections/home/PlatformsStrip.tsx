import { ArrowDownLeft } from "lucide-react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { PLATFORMS } from "@/data/platforms";

/**
 * kota.co.uk devotes a full giant-heading section to a client-logo wall.
 * Velova doesn't have signed-off client logos to show (see Marquee's note
 * on the SEO Blueprint's unsupported-claim flag), so this reproduces the
 * same visual beat — giant heading, diagonal arrow, a wall of marks —
 * honestly: the ad/commerce platforms Velova actually runs campaigns on.
 */

export function PlatformsStrip() {
  return (
    <section data-mode="dark" className="relative bg-bg text-text py-20 md:py-32 border-b border-border overflow-hidden">
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="relative mb-14 max-w-3xl">
          <p className="eyebrow mb-4">Platforms We Run On</p>
          <AnimatedHeading as="h2" className="heading-giant text-text">
            Platforms
          </AnimatedHeading>
          <ArrowDownLeft className="hidden md:block absolute top-0 right-0 text-text-2" size={40} strokeWidth={1.5} />
        </div>

        <div className="flex flex-wrap gap-4">
          {PLATFORMS.map((platform) => (
            <span
              key={platform}
              className="font-display font-semibold uppercase tracking-tight text-[clamp(1.25rem,2.2vw,2rem)] border border-border rounded-[var(--radius-pill)] px-8 py-4 text-text-2 hover:text-text hover:border-text transition-colors"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

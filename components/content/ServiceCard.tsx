import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { service } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { ServiceSummary } from "@/data/services";

interface ServiceCardProps {
  service: ServiceSummary;
  className?: string;
}

/**
 * Two visual weights encode the SEO Blueprint §1.1 positioning fork
 * directly: hero services get the larger, image-backed treatment;
 * supporting services stay compact and text-led. See Design Architecture §8.
 */
export function ServiceCard({ service: s, className }: ServiceCardProps) {
  const isHero = s.tier === "hero";

  return (
    <Link
      href={service(s.slug)}
      data-cursor="hover"
      className={cn(
        "corner-card group relative flex flex-col overflow-hidden border border-border bg-surface transition-colors hover:border-accent-text",
        isHero ? "row-span-2" : "",
        className,
      )}
    >
      {isHero && (
        <div className="h-40 md:h-48">
          <ImageReveal alt={s.cardTitle} placeholderVariant="ember" className="h-full w-full" />
        </div>
      )}
      <div className={cn("flex flex-col flex-1 justify-between gap-6", isHero ? "p-6 md:p-8" : "p-5 md:p-6")}>
        <div>
          <p className="eyebrow mb-3">{isHero ? "Hero service" : "Also available"}</p>
          <h3 className={cn("font-display text-text", isHero ? "text-h3" : "text-lg font-sans font-semibold")}>
            {s.cardTitle}
          </h3>
          <p className="text-caption text-text-2 mt-3 leading-relaxed">{s.cardSummary}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
          View service
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

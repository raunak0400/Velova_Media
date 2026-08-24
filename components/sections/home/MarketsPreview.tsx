"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { useStaggerReveal } from "@/animations/hooks";
import { MARKETS } from "@/data/markets";
import { ROUTES } from "@/constants/routes";

export function MarketsPreview() {
  const gridRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 14, stagger: 0.05 });
  const headerRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { stagger: 0.08 });

  return (
    <SectionWrapper mode="light" motionBudget="standard">
      <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
        <div data-reveal-item className="max-w-2xl">
          <p className="eyebrow mb-4">Markets We Serve</p>
          <AnimatedHeading as="h2" className="heading-giant text-text">
            Ahmedabad Roots. Global Reach.
          </AnimatedHeading>
        </div>
        <Link
          href={ROUTES.markets}
          data-cursor="hover"
          data-reveal-item
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text shrink-0"
        >
          Explore every market
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
        {MARKETS.map((market) => (
          <div key={market.code} data-reveal-item className="bg-bg p-6 flex flex-col gap-3">
            <span className="text-data font-mono font-semibold text-accent-text text-lg">{market.code}</span>
            <h3 className="text-sm font-semibold text-text">{market.name}</h3>
            {market.isHome && <span className="text-small text-text-2">Home market</span>}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

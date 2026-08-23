"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { ServiceCard } from "@/components/content/ServiceCard";
import { Button } from "@/components/ui/Button";
import { SERVICES, SUPPORTING_SERVICES } from "@/data/services";
import { service } from "@/constants/routes";
import { cn } from "@/lib/utils/cn";
import { DURATION } from "@/constants/motion";

const HERO_SERVICES_LIST = SERVICES.filter((s) => s.tier === "hero");

/**
 * Desktop: hover-driven list + live preview panel — an explorer, not a
 * static grid. Mobile: falls back to the tiered ServiceCard grid, since a
 * hover interaction has no equivalent on touch. See Design Architecture §8.
 */
export function ServicesShowcase() {
  const [active, setActive] = useState(HERO_SERVICES_LIST[0].slug);
  const activeService = HERO_SERVICES_LIST.find((s) => s.slug === active) ?? HERO_SERVICES_LIST[0];

  return (
    <section data-mode="light" className="relative bg-bg text-text py-20 md:py-32 border-b border-border overflow-hidden" id="services">
      <GradientMesh />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16">
        <div className="relative mb-14 max-w-3xl">
          <p className="eyebrow mb-4">Services</p>
          <AnimatedHeading as="h2" className="heading-giant heading-giant--thin text-text">
            9 Services. One Agency.
          </AnimatedHeading>
          <ArrowDownLeft className="hidden md:block absolute top-0 right-0 text-text-2" size={40} strokeWidth={1.5} />
        </div>

        {/* Desktop explorer */}
        <div className="hidden lg:grid grid-cols-[1fr_1.1fr] gap-16">
          <ul className="flex flex-col border-t border-border">
            {HERO_SERVICES_LIST.map((s) => (
              <li key={s.slug} className="border-b border-border">
                <Link
                  href={service(s.slug)}
                  data-cursor="hover"
                  onMouseEnter={() => setActive(s.slug)}
                  className={cn(
                    "flex items-center justify-between py-5 px-2 transition-colors group",
                    active === s.slug ? "text-accent-text" : "text-text hover:text-accent-text",
                  )}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-h4">{s.cardTitle}</span>
                    <span className="eyebrow !text-text-2">Hero</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className={cn("transition-transform", active === s.slug && "translate-x-1 -translate-y-1")}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div data-mode="dark" className="corner-card-lg relative h-[460px] bg-bg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
                className="absolute inset-0 flex flex-col"
              >
                <div className="h-1/2">
                  <ImageReveal alt={activeService.cardTitle} placeholderVariant="ember" className="h-full w-full" />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between gap-6">
                  <p className="text-body text-text-2 leading-relaxed">{activeService.cardSummary}</p>
                  <Button variant="secondary" href={service(activeService.slug)} className="w-fit">
                    Find out more
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet grid fallback for hero services */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
          {HERO_SERVICES_LIST.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <div className="mt-16">
          <p className="eyebrow mb-6">Also Available</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORTING_SERVICES.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

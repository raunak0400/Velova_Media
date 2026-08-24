"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { ROUTES } from "@/constants/routes";
import { BUSINESS } from "@/constants/business";
import { gsap, registerGSAP, ScrollTrigger } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SOLIDIFY_DISTANCE = 120;

/**
 * kota.co.uk keeps its top bar to three elements — logo, a solid CTA pill,
 * a circular menu toggle — and puts every nav link behind the full-screen
 * overlay (MobileNav, triggered at every breakpoint here, not just mobile).
 * Transparent-over-hero, solid-on-scroll — the solidify itself is a
 * scrub-tied ScrollTrigger (same global-progress pattern as ScrollProgress)
 * rather than a binary class swap, so the bar continuously interpolates
 * instead of snapping at a fixed threshold.
 */
export function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const bg = bgRef.current;
    const nav = navRef.current;
    if (!bg || !nav) return;

    if (reducedMotion) {
      gsap.set(bg, { opacity: 1 });
      gsap.set(nav, { paddingTop: "0.75rem", paddingBottom: "0.75rem" });
      return;
    }

    gsap.set(nav, { paddingTop: "1.25rem", paddingBottom: "1.25rem" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: SOLIDIFY_DISTANCE,
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bg, { opacity: self.progress * 0.95 });
        gsap.set(nav, {
          paddingTop: gsap.utils.interpolate(1.25, 0.75, self.progress) + "rem",
          paddingBottom: gsap.utils.interpolate(1.25, 0.75, self.progress) + "rem",
        });
      },
    });

    return () => trigger.kill();
  }, { scope: headerRef, dependencies: [reducedMotion] });

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    const scrollProgress = reducedMotion ? 1 : gsap.utils.clamp(0, 1, window.scrollY / SOLIDIFY_DISTANCE);
    gsap.to(bg, { opacity: navOpen ? 1 : scrollProgress * 0.95, duration: 0.2 });
  }, [navOpen, reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 inset-x-0 z-50" data-mode="light">
        <div ref={bgRef} aria-hidden="true" className="absolute inset-0 bg-bg backdrop-blur border-b border-border opacity-0" />
        <nav ref={navRef} className="relative mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 flex items-center justify-between">
          <Link href={ROUTES.home} data-cursor="hover" className="flex items-center gap-3 shrink-0">
            <span className="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-0.5 w-11 h-11 border-2 border-text p-1.5">
              <span className="flex items-center justify-center font-display text-[8px] font-bold uppercase leading-none text-text">Ve</span>
              <span className="flex items-center justify-center font-display text-[8px] font-bold uppercase leading-none text-text">Lo</span>
              <span className="flex items-center justify-center font-display text-[8px] font-bold uppercase leading-none text-text">Va</span>
              <span className="flex items-center justify-center font-display text-[8px] font-bold uppercase leading-none text-text">Me</span>
            </span>
            <span className="hidden sm:block font-display text-lg font-bold uppercase tracking-tight text-text">
              {BUSINESS.name}
            </span>
          </Link>

          <span className="hidden lg:block eyebrow !text-text-2 !tracking-[0.14em]">
            Digital Marketing Agency — Ahmedabad
          </span>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="md" href={ROUTES.contact} className="hidden sm:inline-flex">
              Hire Us
            </Button>
            <button
              className="w-11 h-11 shrink-0 rounded-full border-2 border-text flex items-center justify-center text-text transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
              aria-label="Open menu"
              aria-expanded={navOpen}
              data-cursor="hover"
              onClick={() => setNavOpen(true)}
            >
              <Menu size={19} />
            </button>
          </div>
        </nav>
      </header>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </>
  );
}

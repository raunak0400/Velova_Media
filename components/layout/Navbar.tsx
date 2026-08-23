"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { ROUTES } from "@/constants/routes";
import { BUSINESS } from "@/constants/business";
import { cn } from "@/lib/utils/cn";

/**
 * kota.co.uk keeps its top bar to three elements — logo, a solid CTA pill,
 * a circular menu toggle — and puts every nav link behind the full-screen
 * overlay (MobileNav, triggered at every breakpoint here, not just mobile).
 * Transparent-over-hero, solid-on-scroll.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,padding] duration-300 ease-[var(--ease-standard)]",
          scrolled || navOpen
            ? "bg-bg/95 backdrop-blur border-b border-border py-3"
            : "bg-transparent border-b border-transparent py-5",
        )}
        data-mode="light"
      >
        <nav className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 flex items-center justify-between">
          <Link href={ROUTES.home} data-cursor="hover" className="flex items-center gap-3 shrink-0">
            <span className="grid grid-cols-2 gap-x-1 border-2 border-text p-1.5 leading-none">
              <span className="font-display text-[11px] font-bold uppercase text-text">Ve</span>
              <span className="font-display text-[11px] font-bold uppercase text-text">Lo</span>
              <span className="font-display text-[11px] font-bold uppercase text-text">Va</span>
              <span className="font-display text-[11px] font-bold uppercase text-text">Me</span>
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

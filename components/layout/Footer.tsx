"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FooterGlow } from "@/components/motion/FooterGlow";
import { Button } from "@/components/ui/Button";
import { useStaggerReveal } from "@/animations/hooks";
import { BUSINESS } from "@/constants/business";
import { ROUTES } from "@/constants/routes";
import { FOOTER_LEGAL_LINKS } from "@/data/nav";
import { MARKETS } from "@/data/markets";
import { PLATFORMS } from "@/data/platforms";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";

const SOCIAL_LINKS = [
  { label: "WhatsApp", href: whatsappLink(WHATSAPP_MESSAGES.general) },
  { label: "LinkedIn", href: BUSINESS.social.linkedin },
  { label: "Instagram", href: BUSINESS.social.instagram },
] as const;

/**
 * Mirrors kota.co.uk's footer row-for-row — logo left / one huge clickable
 * email right, socials (plain text + external-link arrow, no leading icon)
 * left / platform badges right (Velova's honest stand-in for Kota's award
 * badges, shared with PlatformsStrip), a flat link row with a CTA pill, then
 * sector pills + copyright on one line, all bright text on black — no
 * divider borders between rows (Kota's footer is one unbroken glow, not
 * bordered strips). No services/company link grid and no address block
 * (Kota's footer carries none of that, and Velova's real street
 * address/PIN/phone aren't filled in yet, so showing them here would leak
 * literal "TODO" placeholder text) — full site nav still lives in the
 * primary nav (Navbar/MobileNav).
 */
export function Footer() {
  const year = new Date().getFullYear();
  const revealRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 20, stagger: 0.08, budget: "calm" });

  return (
    <footer data-mode="dark" className="relative bg-bg text-text overflow-hidden">
      <FooterGlow />

      <div ref={revealRef} className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 py-16 md:py-24">
        <div data-reveal-item className="flex flex-wrap items-center justify-between gap-4 md:gap-6 mb-16">
          <span
            className="hidden sm:grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-1.5 w-24 h-24 border-[3px] border-white p-3 shrink-0"
            style={{ boxShadow: "0 0 28px rgba(255,255,255,0.25)" }}
          >
            <span className="flex items-center justify-center font-display text-sm font-bold uppercase leading-none text-white">Ve</span>
            <span className="flex items-center justify-center font-display text-sm font-bold uppercase leading-none text-white">Lo</span>
            <span className="flex items-center justify-center font-display text-sm font-bold uppercase leading-none text-white">Va</span>
            <span className="flex items-center justify-center font-display text-sm font-bold uppercase leading-none text-white">Me</span>
          </span>
          <a
            href={`mailto:${BUSINESS.email}`}
            data-cursor="hover"
            className="font-display font-semibold text-text text-[clamp(1.75rem,6vw,4.5rem)] leading-none tracking-tight hover:text-accent-text transition-colors break-all text-right"
          >
            {BUSINESS.email}
          </a>
        </div>

        <div data-reveal-item className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 mb-16">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 text-lg font-semibold text-text hover:text-accent-text transition-colors"
              >
                {social.label}
                <ArrowUpRight size={17} strokeWidth={2} />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {PLATFORMS.map((platform) => (
              <span
                key={platform}
                className="font-display text-sm font-semibold uppercase tracking-tight border border-text/40 rounded-[var(--radius-pill)] px-4 py-2 text-text"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        <div data-reveal-item className="flex flex-wrap items-center justify-between gap-6 mb-16">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href={ROUTES.contact} className="text-lg font-semibold text-text hover:text-accent-text transition-colors">
              Contact
            </Link>
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg font-semibold text-text hover:text-accent-text transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <Button variant="secondary" href={ROUTES.contact}>
            Get in touch
          </Button>
        </div>

        <div data-reveal-item className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-base font-semibold text-text mr-2">Markets we serve</span>
            {MARKETS.map((market) => (
              <span
                key={market.code}
                className="rounded-[var(--radius-pill)] border border-text/40 px-4 py-1.5 text-base text-text"
              >
                {market.name}
              </span>
            ))}
          </div>
          <p className="text-lg md:text-xl text-text">
            &copy; {year} {BUSINESS.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

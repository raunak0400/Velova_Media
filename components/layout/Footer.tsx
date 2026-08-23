import Link from "next/link";
import { Instagram, Linkedin, MessageCircle } from "lucide-react";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { BUSINESS } from "@/constants/business";
import { ROUTES, service } from "@/constants/routes";
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS } from "@/data/nav";
import { SERVICES } from "@/data/services";
import { MARKETS } from "@/data/markets";
import { whatsappLink, WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";

/**
 * kota.co.uk's footer is built around one huge clickable email address over
 * a drifting gradient backdrop, with everything else (socials, nav, sector
 * pills, legal) kept quiet underneath. NAP block still reads from
 * constants/business.ts so it can never drift from the LocalBusiness schema
 * built from the same file. See SEO Blueprint §6.7/§7.2.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-mode="dark" className="relative bg-bg text-text border-t border-border overflow-hidden">
      <GradientMesh />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="flex items-center gap-4 md:gap-6 mb-16">
          <span className="hidden sm:grid grid-cols-2 gap-x-1 border-2 border-text p-2 leading-none shrink-0">
            <span className="font-display text-xs font-bold uppercase text-text">Ve</span>
            <span className="font-display text-xs font-bold uppercase text-text">Lo</span>
            <span className="font-display text-xs font-bold uppercase text-text">Va</span>
            <span className="font-display text-xs font-bold uppercase text-text">Me</span>
          </span>
          <a
            href={`mailto:${BUSINESS.email}`}
            data-cursor="hover"
            className="font-display font-semibold text-text text-[clamp(1.75rem,6vw,4.5rem)] leading-none tracking-tight hover:text-accent-text transition-colors break-all"
          >
            {BUSINESS.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-16 pb-16 border-b border-border">
          <a
            href={whatsappLink(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 text-sm font-semibold text-text hover:text-accent-text transition-colors"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a
            href={BUSINESS.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 text-sm font-semibold text-text hover:text-accent-text transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={BUSINESS.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="flex items-center gap-2 text-sm font-semibold text-text hover:text-accent-text transition-colors"
          >
            <Instagram size={16} /> Instagram
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-12 lg:gap-8 mb-16">
          <nav aria-label="Services">
            <p className="eyebrow mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={service(s.slug)} className="text-sm text-text-2 hover:text-accent-text transition-colors">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="eyebrow mb-4">Company</p>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-2 hover:text-accent-text transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Ahmedabad HQ</p>
            <address className="not-italic text-sm text-text-2 leading-relaxed">
              {BUSINESS.address.streetAddress}
              <br />
              {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion} {BUSINESS.address.postalCode}
              <br />
              {BUSINESS.address.addressCountry === "IN" ? "India" : BUSINESS.address.addressCountry}
            </address>
            <p className="text-sm text-text-2 mt-4">
              <a href={`tel:${BUSINESS.phoneDisplay.replace(/\s+/g, "")}`} className="hover:text-accent-text transition-colors">
                {BUSINESS.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-16">
          <span className="eyebrow !text-text-2 mr-2">Markets we serve</span>
          {MARKETS.map((market) => (
            <span
              key={market.code}
              className="rounded-[var(--radius-pill)] border border-border px-4 py-1.5 text-sm text-text-2"
            >
              {market.name}
            </span>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-text-2">
            &copy; {year} {BUSINESS.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-text-2 hover:text-accent-text transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

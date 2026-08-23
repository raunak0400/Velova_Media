import { ROUTES } from "@/constants/routes";
import type { NavLink } from "@/types";

export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: ROUTES.about },
  { label: "Services", href: ROUTES.services },
  { label: "Markets", href: ROUTES.markets },
  { label: "Case Studies", href: ROUTES.caseStudies },
  { label: "Blog", href: ROUTES.blog },
];

export const FOOTER_COMPANY_LINKS: NavLink[] = [
  { label: "About", href: ROUTES.about },
  { label: "Markets", href: ROUTES.markets },
  { label: "Case Studies", href: ROUTES.caseStudies },
  { label: "Blog", href: ROUTES.blog },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms", href: ROUTES.terms },
];

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { PRIMARY_NAV } from "@/data/nav";
import { ROUTES } from "@/constants/routes";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";
import { DURATION } from "@/constants/motion";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [{ label: "Home", href: ROUTES.home }, ...PRIMARY_NAV, { label: "Contact", href: ROUTES.contact }];

const ENTRANCE_EASE = [0.34, 1.56, 0.64, 1] as const;
const STANDARD_EASE = [0.8, 0, 0.1, 1] as const;

const panelVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: DURATION.slow, ease: ENTRANCE_EASE },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: DURATION.fast, ease: STANDARD_EASE },
  },
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const itemVariants: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: DURATION.base, ease: ENTRANCE_EASE } },
};

/** Full-screen overlay, focus-trapped, closes on Escape or route change. See Design Architecture §8. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          data-mode="dark"
          className="fixed inset-0 z-[60] bg-bg flex flex-col"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between px-5 py-6">
            <span className="font-display text-lg text-text">Menu</span>
            <button onClick={onClose} aria-label="Close menu" className="p-2 -mr-2 text-text">
              <X size={24} />
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col justify-center gap-2 px-5"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.li key={item.href} variants={itemVariants} className="overflow-hidden">
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  className="font-display text-[13vw] leading-[1.1] uppercase tracking-tight text-text hover:text-accent-text transition-colors inline-block"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="px-5 pb-10">
            <WhatsAppCTA message={WHATSAPP_MESSAGES.general} size="lg" className="w-full justify-center">
              Chat on WhatsApp
            </WhatsAppCTA>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

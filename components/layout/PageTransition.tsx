"use client";

import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenis } from "@/providers/LenisProvider";
import { DURATION } from "@/constants/motion";

const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A subtle cross-fade + slight rise on route change — not a full-screen
 * wipe. A heavier transition was deliberately rejected (Design
 * Architecture §18): this site's actual job is getting a visitor to
 * WhatsApp fast, and a slow transition on every internal link fights
 * that directly. Navbar/Footer live outside this boundary so they never
 * flicker mid-navigation. Respects prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const lenis = useLenis();

  // Lenis owns scroll and doesn't know about client-side navigation on its
  // own — without this, a route change can leave the visitor scrolled
  // halfway down the new page instead of resetting to the top.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    if (!lenis) window.scrollTo(0, 0);
  }, [pathname, lenis]);

  if (reducedMotion) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: DURATION.fast, ease: ENTRANCE_EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

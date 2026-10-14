"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";

/**
 * Persistent bottom-right pill CTA — kota.co.uk keeps "Start your project"
 * on screen at all times, not just in the hero/nav. Rendered once, globally,
 * outside the normal document flow.
 *
 * Stays hidden below sm: the Navbar's own "Hire Us" button is already
 * permanently on-screen on mobile (fixed header, always solid there — see
 * Navbar), so a second floating pill would just be a competing control
 * fighting the same fixed header for attention on a much smaller viewport,
 * and risks parking itself over the FAQ accordion or the final CTA's own
 * buttons at various scroll positions. One persistent CTA is enough on mobile.
 */
export function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-40 hidden sm:block" data-mode="light">
      <Button variant="primary" href={ROUTES.contact} icon={<ArrowRight size={16} />} className="shadow-[0_8px_30px_-8px_rgba(0,0,0,0.45)]">
        Start a project
      </Button>
    </div>
  );
}

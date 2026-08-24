"use client";

import { Plus } from "lucide-react";
import { useStaggerReveal } from "@/animations/hooks";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

/**
 * Native <details>/<summary> for the toggle itself — no JS needed for that
 * interaction, so the answer content is always in the accessible tree and
 * always matches the FAQPage schema built from this same data. The entrance
 * reveal below is a purely additive enhancement on top (client-only
 * wrapper), never a substitute for the toggle mechanism. See Design
 * Architecture §8/§15.
 */
export function FAQAccordion({ items }: FAQAccordionProps) {
  const listRef = useStaggerReveal<HTMLDivElement>("[data-reveal-item]", { y: 16, stagger: 0.05 });

  return (
    <div ref={listRef} className="border-t border-border">
      {items.map((item) => (
        <details key={item.question} data-reveal-item className="group border-b border-border py-8">
          <summary className="flex items-center justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="font-display text-h3 text-text">{item.question}</span>
            <span className="shrink-0 w-11 h-11 rounded-full border-2 border-border flex items-center justify-center transition-colors group-open:border-accent group-open:bg-accent group-open:text-on-brand">
              <Plus size={20} className="transition-transform duration-300 group-open:rotate-45" />
            </span>
          </summary>
          <p className="mt-6 text-body-lg text-text-2 leading-relaxed max-w-3xl">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

import { Plus } from "lucide-react";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
}

/**
 * Native <details>/<summary> — no client JS needed, so the answer content
 * is always in the accessible tree and always matches the FAQPage schema
 * built from this same data. Collapsed state is a pure CSS affordance,
 * never a content-hiding mechanism. See Design Architecture §8/§15.
 */
export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-border py-8">
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

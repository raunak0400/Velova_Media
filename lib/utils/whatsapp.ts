import { BUSINESS } from "@/constants/business";

/**
 * Builds a wa.me deep link with a context-specific prefilled message.
 * See SEO Blueprint §6.5 for the exact prefilled-message pattern this follows.
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encoded}`;
}

export const WHATSAPP_MESSAGES = {
  general: "Hi! I'd like to talk about growing my brand with Velova Media.",
  markets: "Hi! I'd like to talk about marketing for my business outside India.",
  b2bLeadGen: "Hi! I'd like a free lead generation audit for my business.",
  service: (serviceName: string) => `Hi! I'd like to know more about your ${serviceName} service.`,
} as const;

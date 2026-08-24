import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/utils/whatsapp";

interface WhatsAppCTAProps {
  message: string;
  children?: React.ReactNode;
  size?: "md" | "lg";
  className?: string;
}

/**
 * WhatsApp is Velova's primary conversion channel (SEO Blueprint §2.1).
 * The button itself matches the site's monochrome pill system (same solid
 * fill as `primary`) rather than WhatsApp's brand green, which clashed with
 * the black/white/purple palette — the green survives only as a small tint
 * on the icon, just enough to stay recognizable. See Design Architecture §4/§7.
 */
export function WhatsAppCTA({ message, children = "Chat on WhatsApp", size = "md", className }: WhatsAppCTAProps) {
  return (
    <Button
      variant="whatsapp"
      size={size}
      href={whatsappLink(message)}
      external
      icon={<MessageCircle size={18} strokeWidth={2} className="text-signal" aria-hidden="true" />}
      iconPosition="left"
      className={className}
    >
      {children}
    </Button>
  );
}

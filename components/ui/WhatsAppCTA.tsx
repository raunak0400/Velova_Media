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
 * Signal green is reserved exclusively for this component — never reused
 * as a decorative accent elsewhere. See Design Architecture §4/§7.
 */
export function WhatsAppCTA({ message, children = "Chat on WhatsApp", size = "md", className }: WhatsAppCTAProps) {
  return (
    <Button
      variant="whatsapp"
      size={size}
      href={whatsappLink(message)}
      external
      icon={<MessageCircle size={18} strokeWidth={2} aria-hidden="true" />}
      iconPosition="left"
      className={className}
    >
      {children}
    </Button>
  );
}

import type { ReactNode } from "react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { GradientMesh } from "@/components/motion/GradientMesh";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Button } from "@/components/ui/Button";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";
import { ROUTES } from "@/constants/routes";

interface CTASectionProps {
  eyebrow?: string;
  heading: ReactNode;
  body?: string;
  whatsappMessage?: string;
}

/** The one closing-CTA pattern reused at the bottom of every page. */
export function CTASection({
  eyebrow = "Let's Talk",
  heading,
  body = "Tell us about your brand and your market — India or otherwise — and we'll reply with a plan, not a pitch.",
  whatsappMessage = WHATSAPP_MESSAGES.general,
}: CTASectionProps) {
  return (
    <section data-mode="dark" className="relative bg-bg text-text py-24 md:py-40 border-b border-border overflow-hidden">
      <GradientMesh />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16 text-center flex flex-col items-center">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <AnimatedHeading as="h2" className="heading-giant text-text max-w-5xl mx-auto !text-[clamp(2.25rem,5vw,4.5rem)]">
          {heading}
        </AnimatedHeading>
        <p className="text-body-lg text-text-2 max-w-xl mt-8 mb-10">{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <WhatsAppCTA message={whatsappMessage} size="lg" />
          <Button variant="secondary" size="lg" href={ROUTES.contact}>
            Send a Message
          </Button>
        </div>
      </div>
    </section>
  );
}

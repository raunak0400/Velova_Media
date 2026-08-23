import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { WHATSAPP_MESSAGES } from "@/lib/utils/whatsapp";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Page Not Found | Velova Media",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section data-mode="light" className="min-h-screen flex items-center bg-bg text-text">
      <div className="mx-auto max-w-[1440px] w-full px-5 md:px-8 lg:px-16 py-32 text-center flex flex-col items-center">
        <p className="text-data font-mono text-accent-text text-lg mb-6">404</p>
        <h1 className="font-display text-h1 font-medium text-text max-w-2xl mb-6">
          This page doesn&apos;t exist — the rest of the site does.
        </h1>
        <p className="text-body-lg text-text-2 max-w-lg mb-10">
          The link might be old, or the page might have moved. Here&apos;s how to find what you were looking for.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary" size="lg" href={ROUTES.home}>
            Back to Homepage
          </Button>
          <Button variant="secondary" size="lg" href={ROUTES.services}>
            View Services
          </Button>
          <WhatsAppCTA message={WHATSAPP_MESSAGES.general} size="lg" />
        </div>
      </div>
    </section>
  );
}

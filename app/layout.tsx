import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { LenisProvider } from "@/providers/LenisProvider";
import { CursorProvider } from "@/providers/CursorProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { buildOrganizationSchema } from "@/lib/schema/organization";
import { buildLocalBusinessSchema } from "@/lib/schema/localBusiness";
import { BUSINESS } from "@/constants/business";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  // Every route sets its own exact, final title from the SEO Blueprint —
  // no template suffix here, since the blueprint's titles already include
  // "| Velova Media" where it wants it and deliberately omit it elsewhere
  // (e.g. "About Velova Media — ..." already leads with the brand name).
  title: "Best Digital Marketing Agency in Ahmedabad | Velova Media",
  description:
    "Velova Media is Ahmedabad's full-service digital marketing agency — trusted by brands across India, the UK, USA, Canada & the Netherlands. Meta Ads, social, SEO, Shopify & more.",
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_IN",
    url: BUSINESS.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <head>
        <JsonLd data={[buildOrganizationSchema(), buildLocalBusinessSchema()]} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-on-brand focus:px-4 focus:py-2 focus:rounded-[var(--radius-md)] focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <GrainOverlay />
        <LenisProvider>
          <CursorProvider>
            <ScrollProgress />
            <Navbar />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <FloatingCTA />
          </CursorProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

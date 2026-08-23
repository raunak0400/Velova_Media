import { Syne } from "next/font/google";
import localFont from "next/font/local";

/**
 * Two faces — matches kota.co.uk's pairing: Syne for display/headings
 * (uppercase, tight tracking, huge scale), General Sans for body copy.
 * General Sans is self-hosted (Fontshare, free/open license) rather than
 * PP Neue Montreal, which Kota licenses commercially from Pangram Pangram.
 */

export const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const generalSans = localFont({
  src: [
    { path: "../assets/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/GeneralSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const fontVariables = `${syne.variable} ${generalSans.variable}`;

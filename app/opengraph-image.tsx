import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BUSINESS } from "@/constants/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide fallback OG card — real, non-fabricated brand asset (the
 * wordmark + tagline rendered in the actual design system, not a stock
 * photo standing in for real client photography we don't have). Individual
 * routes can override by adding their own opengraph-image file.
 */
export default async function Image() {
  const [bodoni, instrument] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/og-bodoni-600.ttf")),
    readFile(join(process.cwd(), "assets/fonts/og-instrument-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0a0a09",
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d69a54",
            fontFamily: "Instrument Sans",
            marginBottom: 28,
          }}
        >
          Digital Marketing Agency, Ahmedabad
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            color: "#eeebe3",
            fontFamily: "Bodoni Moda",
          }}
        >
          {BUSINESS.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#9b978c",
            fontFamily: "Instrument Sans",
            marginTop: 24,
          }}
        >
          {BUSINESS.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bodoni Moda", data: bodoni, weight: 600, style: "normal" },
        { name: "Instrument Sans", data: instrument, weight: 500, style: "normal" },
      ],
    },
  );
}

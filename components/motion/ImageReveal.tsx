"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useClipReveal } from "@/animations/hooks";
import { cn } from "@/lib/utils/cn";

interface ImageRevealProps {
  src?: string;
  alt: string;
  direction?: "left" | "right" | "bottom" | "top";
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Placeholder gradient variant used when no real photography exists yet — see note below. */
  placeholderVariant?: "ember" | "ink";
}

/**
 * clip-path wipe reveal wrapping next/image. No real client photography or
 * video has been supplied yet, so `src` is optional: omitting it renders an
 * animated placeholder — a slow gradient sweep plus a pulsing play badge —
 * that reads honestly as "video coming here" rather than a fabricated photo
 * or a static color swatch. Swap for real footage/photography as it becomes
 * available; the reveal animation and layout are otherwise production-ready
 * as-is.
 */
export function ImageReveal({
  src,
  alt,
  direction = "bottom",
  priority = false,
  sizes = "100vw",
  className,
  placeholderVariant = "ember",
}: ImageRevealProps) {
  const ref = useClipReveal<HTMLDivElement>({ direction });

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "absolute inset-0 placeholder-video",
            placeholderVariant === "ember" ? "placeholder-video--ember" : "placeholder-video--ink",
          )}
        >
          <span className="placeholder-video__badge" aria-hidden="true">
            <Play fill="currentColor" strokeWidth={0} />
          </span>
        </div>
      )}
    </div>
  );
}

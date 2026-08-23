"use client";

import Image from "next/image";
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
 * clip-path wipe reveal wrapping next/image. No real client photography has
 * been supplied yet, so `src` is optional: omitting it renders a tasteful
 * abstract gradient placeholder (never a fabricated "photo") that should be
 * swapped for real editorial photography as it becomes available — the
 * reveal animation and layout are otherwise production-ready as-is.
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
            "absolute inset-0",
            placeholderVariant === "ember"
              ? "bg-[linear-gradient(135deg,var(--color-accent-dim),var(--color-accent))]"
              : "bg-[linear-gradient(135deg,var(--color-surface),var(--color-border))]",
          )}
        />
      )}
    </div>
  );
}

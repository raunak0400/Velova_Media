"use client";

import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { useClipReveal } from "@/animations/hooks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface VideoRevealProps {
  src?: string;
  /** Accessible label describing the footage (the <video> has no text content). */
  alt: string;
  direction?: "left" | "right" | "bottom" | "top";
  poster?: string;
  className?: string;
  /** Placeholder gradient variant used when no `src` is supplied yet — see note below. */
  placeholderVariant?: "ember" | "ink";
}

/**
 * clip-path wipe reveal wrapping a looping, muted <video>. Mirrors ImageReveal
 * so the two can be swapped freely: same reveal animation, same optional-`src`
 * placeholder fallback when footage hasn't been supplied.
 *
 * Crucially it does NOT use the native `autoplay` attribute — that would start
 * every video on the page decoding at once (several of these plus the hero
 * showreel), which janks scrolling badly. Instead an IntersectionObserver
 * plays a clip only while it's on screen and pauses it otherwise, so at most
 * the visible one or two are ever decoding. Also paused entirely under
 * prefers-reduced-motion (the first frame still shows via preload=metadata).
 */
export function VideoReveal({
  src,
  alt,
  direction = "bottom",
  poster,
  className,
  placeholderVariant = "ember",
}: VideoRevealProps) {
  const ref = useClipReveal<HTMLDivElement>({ direction });
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, src]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-surface", className)}>
      {src ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
        />
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

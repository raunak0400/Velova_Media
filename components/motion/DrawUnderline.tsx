"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION } from "@/constants/motion";

interface DrawUnderlineProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * SVG path drawing reserved for exactly one place — the emphasized word in
 * the hero headline — so it stays a signature moment rather than a
 * recurring decorative motif. See Design Architecture §10.
 */
export function DrawUnderline({ children, delay = 1.1, className }: DrawUnderlineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    if (reducedMotion) {
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
      return;
    }

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: DURATION.slow,
      delay,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, { scope: pathRef, dependencies: [reducedMotion, delay] });

  return (
    <span className={className} style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", left: 0, right: 0, bottom: "-0.15em", width: "100%", height: "0.3em", overflow: "visible" }}
      >
        <path
          ref={pathRef}
          d="M2,12 C50,2 150,2 198,11"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={3}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

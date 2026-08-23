"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP, ScrollTrigger } from "@/animations/config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A 2px ember bar fixed to the top of the viewport, width driven by scroll
 * progress via transform: scaleX() (never width) from a left origin.
 * See Design Architecture §10.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    registerGSAP();
    const bar = barRef.current;
    if (!bar || reducedMotion) return;

    gsap.set(bar, { scaleX: 0 });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, { scope: barRef, dependencies: [reducedMotion] });

  if (reducedMotion) return null;

  return (
    <div className="fixed top-0 inset-x-0 h-[2px] z-[60] bg-transparent" aria-hidden="true">
      <div ref={barRef} className="h-full bg-accent origin-left" />
    </div>
  );
}

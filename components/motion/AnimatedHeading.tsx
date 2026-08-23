"use client";

import { type ElementType, type ReactNode } from "react";
import { useSplitReveal } from "@/animations/hooks";
import { cn } from "@/lib/utils/cn";

interface AnimatedHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  type?: "words" | "lines";
  trigger?: "scroll" | "load";
  delay?: number;
}

/**
 * Wraps real, server-rendered text and re-wraps it client-side for a
 * SplitText reveal — the text itself is never owned or fetched by this
 * component, only decorated. See Design Architecture §8/§15.
 */
export function AnimatedHeading({
  children,
  as: Tag = "h2",
  className,
  type = "words",
  trigger = "scroll",
  delay = 0,
}: AnimatedHeadingProps) {
  const ref = useSplitReveal<HTMLHeadingElement>({ type, trigger, delay });

  return (
    <Tag ref={ref} className={cn("font-display", className)}>
      {children}
    </Tag>
  );
}

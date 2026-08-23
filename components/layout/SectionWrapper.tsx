import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { MotionBudget, SectionMode } from "@/types";

interface SectionWrapperProps {
  id?: string;
  mode?: SectionMode;
  motionBudget?: MotionBudget;
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  fullBleed?: boolean;
}

/**
 * The one place that draws the line between the "cinematic" and
 * "editorial-dense" registers (Design Architecture §2/§4). Declares
 * data-mode so the color tokens in globals.css flip for everything inside,
 * and stamps data-motion-budget so nested animation hooks can read the
 * section's intended intensity without prop-drilling it manually.
 */
export function SectionWrapper({
  id,
  mode = "light",
  motionBudget = "standard",
  as: Tag = "section",
  className,
  innerClassName,
  children,
  fullBleed = false,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      data-mode={mode}
      data-motion-budget={motionBudget}
      className={cn("bg-bg text-text py-16 md:py-32 border-b border-border", className)}
    >
      <div className={cn(!fullBleed && "mx-auto max-w-[1440px] px-5 md:px-8 lg:px-16", innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}

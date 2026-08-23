"use client";

import { useCounter } from "@/animations/hooks";
import { cn } from "@/lib/utils/cn";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}

/**
 * The fix for the audited stat-counter bug: this span's text content is
 * "{prefix}{value}{suffix}" unconditionally in the server-rendered HTML —
 * a crawler or a page read before JS runs sees the real number. The
 * useCounter hook only re-tweens it upward from 0 as a client-only visual
 * enhancement layered on top. See Design Architecture §15.
 */
export function StatCounter({ value, prefix = "", suffix = "", label, className }: StatCounterProps) {
  const ref = useCounter<HTMLSpanElement>({ to: value, prefix, suffix });

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span ref={ref} className="font-display font-semibold text-accent-text text-5xl md:text-6xl tabular-nums">
        {prefix}
        {value}
        {suffix}
      </span>
      <span className="text-caption text-text-2">{label}</span>
    </div>
  );
}

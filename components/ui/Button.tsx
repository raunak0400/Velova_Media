"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/animations/hooks";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "whatsapp";

interface BaseProps {
  variant?: ButtonVariant;
  size?: "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * kota.co.uk's buttons are pills: the primary CTA ("Hire us", "Start your
 * project") is a solid black/white-invert fill, while in-content CTAs
 * ("Find out more") are an outline pill that inverts to solid on hover.
 * `ghost`/`link` stay plain text for lower-emphasis inline actions.
 */
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "rounded-[var(--radius-pill)] border-2 border-text bg-[var(--color-text)] text-[var(--color-bg)] hover:bg-accent hover:border-accent hover:text-on-brand",
  secondary:
    "rounded-[var(--radius-pill)] border-2 border-text text-text bg-transparent hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]",
  ghost: "bg-transparent text-text btn-ghost-underline",
  link: "bg-transparent text-accent-text font-medium underline-offset-4 decoration-transparent hover:decoration-accent-text underline p-0",
  whatsapp: "rounded-[var(--radius-pill)] bg-signal text-white hover:brightness-[1.06]",
};

const PILL_VARIANTS: ButtonVariant[] = ["primary", "secondary", "whatsapp"];
const ARROW_VARIANTS: ButtonVariant[] = ["primary", "secondary"];

const SIZE_CLASSES: Record<NonNullable<BaseProps["size"]>, string> = {
  md: "px-6 py-3.5 text-[14.5px]",
  lg: "px-8 py-4 text-base",
};

const MAGNETIC_VARIANTS: ButtonVariant[] = ["whatsapp"];

/**
 * The single button component for the whole site — variant prop only.
 * WhatsApp gets the magnetic cursor-pull (it's the floating primary
 * conversion action); every other variant relies on cheap CSS transitions
 * plus a group-driven arrow nudge on hover.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    icon,
    iconPosition = "right",
    className,
    children,
  } = props;

  const magneticRef = useMagnetic<HTMLElement>({
    enabled: MAGNETIC_VARIANTS.includes(variant) && !disabled && !loading,
  });

  const isLink = variant !== "link" && "href" in props && props.href !== undefined;
  const isInlineLink = variant === "link";
  const isPill = PILL_VARIANTS.includes(variant);
  const resolvedIcon = icon ?? (ARROW_VARIANTS.includes(variant) ? <ArrowUpRight size={17} strokeWidth={2} aria-hidden="true" /> : null);

  const sharedClasses = cn(
    "group relative inline-flex items-center gap-2 font-semibold tracking-[0.01em] transition-[background-color,border-color,opacity,color] duration-300 ease-[var(--ease-standard)] will-change-transform",
    !isInlineLink && SIZE_CLASSES[size],
    !isInlineLink && !isPill && "rounded-[var(--radius-md)]",
    VARIANT_CLASSES[variant],
    (disabled || loading) && "opacity-40 pointer-events-none",
    className,
  );

  const iconClasses = "transition-transform duration-300 ease-[var(--ease-standard)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

  const content = (
    <>
      {loading ? (
        <span className="btn-loading-dots" aria-hidden="true">
          &middot;&middot;&middot;
        </span>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          {resolvedIcon && iconPosition === "left" && !icon && <span className={iconClasses}>{resolvedIcon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && icon}
          {resolvedIcon && iconPosition === "right" && !icon && <span className={iconClasses}>{resolvedIcon}</span>}
        </>
      )}
    </>
  );

  if (isLink && "href" in props) {
    const { href, external } = props as ButtonAsLink;
    if (external || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
      return (
        <a
          ref={magneticRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={sharedClasses}
          data-cursor="hover"
          aria-disabled={disabled || loading}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        ref={magneticRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClasses}
        data-cursor="hover"
        aria-disabled={disabled || loading}
      >
        {content}
      </Link>
    );
  }

  const { type = "button", onClick } = props as ButtonAsButton;

  return (
    <button
      ref={magneticRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={sharedClasses}
      data-cursor="hover"
    >
      {content}
    </button>
  );
}

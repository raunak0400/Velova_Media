/**
 * Single source of truth for every duration/easing value used across
 * GSAP timelines, Framer Motion variants and CSS transitions.
 * See Velova_Media_Design_Architecture.md §3 for the rationale behind each value.
 */

export const DURATION = {
  instant: 0.12,
  fast: 0.28,
  base: 0.55,
  slow: 0.9,
  cinematic: 1.7,
} as const;

export const DURATION_MS = {
  instant: 120,
  fast: 280,
  base: 550,
  slow: 900,
  cinematic: 1700,
} as const;

/** kota.co.uk's production easing tokens (extracted from its --animation-* CSS custom properties). */
export const EASE = {
  standard: "cubic-bezier(0.75, 0, 0.25, 1)",
  entrance: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  magnetic: "cubic-bezier(0.2, 0.9, 0.2, 1)",
  navigation: "cubic-bezier(0.8, 0, 0.1, 1)",
} as const;

/** GSAP-flavoured ease strings (power/back curves are cheaper for GSAP to tween than raw bezier arrays at scale). */
export const GSAP_EASE = {
  standard: "power4.inOut",
  entrance: "back.out(1.6)",
  magnetic: "power3.out",
  navigation: "power4.inOut",
} as const;

export const STAGGER = {
  text: 0.02,
  grid: 0.07,
} as const;

export const MOTION_BUDGET = {
  cinematic: "cinematic",
  standard: "standard",
  calm: "calm",
} as const;

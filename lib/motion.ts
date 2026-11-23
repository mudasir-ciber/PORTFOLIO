/**
 * Shared motion tokens for cinematic, controlled animation.
 * Use these everywhere — do not invent per-component timings.
 */

export const duration = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.7,
  cinematic: 0.9,
} as const;

export const ease = {
  /** Smooth decelerate — primary UI motion */
  out: [0.16, 1, 0.3, 1] as const,
  /** Balanced enter/exit */
  inOut: [0.65, 0, 0.35, 1] as const,
  /** Soft cinematic rise */
  cinematic: [0.22, 1, 0.36, 1] as const,
};

export const transition = {
  fast: { duration: duration.fast, ease: ease.out },
  normal: { duration: duration.normal, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.cinematic },
  cinematic: { duration: duration.cinematic, ease: ease.cinematic },
} as const;

/** Default reveal offset in pixels */
export const revealOffset = 28;

export const revealVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: revealOffset },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: revealOffset },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -revealOffset },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
} as const;

export type RevealVariant = keyof typeof revealVariants;

import type { Variants } from 'framer-motion';

// Shared animation config for Muse Bar
// Subtle & elegant — slow fade-ins, smooth reveals

export const animation = {
  duration: { fast: 0.3, normal: 0.6, slow: 0.8 },
  easing: [0.25, 0.1, 0.25, 1] as const,
  viewport: { once: true, amount: 0.2 },
} as const;

// Direction offsets for FadeIn
const directionOffset = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
  none: {},
} as const;

export type FadeDirection = keyof typeof directionOffset;

export function fadeInVariants(
  direction: FadeDirection = 'up',
  duration: number = animation.duration.normal,
): Variants {
  return {
    hidden: { opacity: 0, ...directionOffset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: animation.easing },
    },
  };
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: (staggerDelay: number = 0.15) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: animation.duration.fast, ease: animation.easing },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: animation.easing },
  },
};

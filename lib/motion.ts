"use client";

import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealTransition: Transition = {
  duration: 0.45,
  ease: easeOutExpo,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
};

export const viewportOnce = { once: true, amount: 0.15 as const };

export function reducedMotionSafe(prefersReduced: boolean | null): Transition {
  if (prefersReduced) return { duration: 0.01 };
  return revealTransition;
}

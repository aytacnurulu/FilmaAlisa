// shared/motion.ts
// Filmalisa — single source for animation (Framer Motion).
// Philosophy: CALM, SMOOTH, PROFESSIONAL. Soft bottom-to-top reveals.
// NO glow / breathing / rotation / bounce / spring / infinite loops.
// Nothing animates forever. Logo is static (gradient yes, animation no).
// Aligned with globals.css tokens: --ease-out, --dur-base, --dur-slow.

import type { Variants, Transition } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const; // --ease-out

export const dur = {
  fast: 0.18, // hover / tap
  base: 0.35, // standard entrance
  slow: 0.6, // scroll reveal
} as const;

/* ------------------------------------------------------------------
   Scroll reveal — bottom-to-top, soft.
   Usage:
     <motion.section variants={revealUp} initial="hidden"
        whileInView="show" viewport={{ once: true, amount: 0.3 }} />
   ------------------------------------------------------------------ */

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.slow, ease: easeOut },
  },
};

/* Container + child (so info blocks reveal sequentially) */
export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: easeOut },
  },
};

/* Image / poster — subtle settle in place (faint parallax feel) */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: dur.slow, ease: easeOut },
  },
};

/* ------------------------------------------------------------------
   Micro interactions — very subtle.
   ------------------------------------------------------------------ */

export const cardHover = {
  whileHover: { y: -4 },
  transition: { duration: dur.fast, ease: easeOut },
} as const;

export const buttonTap = {
  whileTap: { scale: 0.98 },
  transition: { duration: dur.fast, ease: easeOut },
} as const;

/* Page transition (use at layout/template level) */
export const pageTransition: {
  initial: any;
  animate: any;
  transition: Transition;
} = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: dur.base, ease: easeOut },
};

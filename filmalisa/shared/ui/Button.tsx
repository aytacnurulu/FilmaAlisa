"use client";

import { type HTMLMotionProps, motion, useReducedMotion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";
import { buttonTap, dur, easeOut } from "@/shared/motion";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium rounded-md",
    "transition-colors cursor-pointer select-none",
    "disabled:opacity-50 disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-text-on-accent hover:bg-accent-hover active:bg-accent-press",
        secondary:
          "bg-surface-2 text-text border border-border hover:border-border-strong",
        ghost: "bg-transparent text-text hover:bg-surface-2",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-[52px] px-6 text-base",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = Omit<HTMLMotionProps<"button">, "size"> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      whileTap={reduced ? undefined : buttonTap.whileTap}
      transition={{ duration: dur.fast, ease: easeOut }}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

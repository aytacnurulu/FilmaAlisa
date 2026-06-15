"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, error, className, ...props }, ref) => (
    <div className="w-full">
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-surface-2 border border-border rounded-md",
            "text-text placeholder:text-text-faint text-base",
            "h-11 px-4",
            "transition-colors",
            "focus-visible:outline-none focus-visible:border-accent",
            "focus-visible:[box-shadow:0_0_0_3px_var(--color-accent-soft)]",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-danger focus-visible:border-danger",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  )
);

Input.displayName = "Input";

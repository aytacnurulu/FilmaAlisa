"use client";

import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";

type RatingProps = {
  value: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

export function Rating({ value, readOnly = true, onChange, className }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rating: ${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        const filled = display >= starValue;

        return readOnly ? (
          <FiStar
            key={i}
            size={14}
            fill={filled ? "currentColor" : "none"}
            strokeWidth={1.5}
            className={filled ? "text-star" : "text-text-faint"}
            aria-hidden="true"
          />
        ) : (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "flex items-center justify-center transition-colors cursor-pointer",
              "focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--color-accent)]",
              filled ? "text-star" : "text-text-faint"
            )}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <FiStar size={14} fill={filled ? "currentColor" : "none"} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}

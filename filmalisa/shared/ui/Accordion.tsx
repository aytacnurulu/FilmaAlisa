"use client";

// shared/ui/Accordion.tsx
// Reusable accordion — items prop driven, no hardcoded content.
// Design: surface-2 rows, border-border separators, + → × icon,
// smooth height reveal via CSS grid trick (no JS height calculation).
// Motion: design.md §9 — calm, no bounce, dur-base easeOut.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import { cn } from "@/shared/lib/cn";
import { dur, easeOut } from "@/shared/motion";

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open simultaneously. Default: false (single open). */
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("w-full flex flex-col gap-0", className)}>
      {items.map((item, index) => {
        const isOpen = openIds.has(item.id);
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div
            key={item.id}
            className={cn(
              "bg-surface-2 border border-border overflow-hidden",
              // round only top corners of first, bottom corners of last
              isFirst && "rounded-t-md",
              isLast && "rounded-b-md",
              // merge borders between items
              !isFirst && "-mt-px",
            )}
          >
            {/* Trigger */}
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              className={cn(
                "w-full flex items-center justify-between gap-4",
                "px-5 py-5 text-left",
                "text-text font-body text-base font-medium",
                "transition-colors duration-[var(--dur-fast)]",
                "hover:bg-surface-3 focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
              )}
            >
              <span>{item.question}</span>

              {/* Icon: + when closed, × when open */}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: dur.fast, ease: easeOut }}
                className="shrink-0 text-text-muted"
                aria-hidden="true"
              >
                <FiPlus size={20} strokeWidth={1.75} />
              </motion.span>
            </button>

            {/* Answer panel — AnimatePresence for mount/unmount */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: dur.base, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pt-1 text-text-muted text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { X } from "lucide-react";

interface AdminModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeMap: Record<NonNullable<AdminModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export default function AdminModal({
  title,
  isOpen,
  onClose,
  children,
  footer,
  size = "md",
}: AdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div
        className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl w-full ${sizeMap[size]}`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#2a2a2a]">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#9a9a9a] hover:text-white p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">{children}</div>

        {footer && (
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-[#2a2a2a]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

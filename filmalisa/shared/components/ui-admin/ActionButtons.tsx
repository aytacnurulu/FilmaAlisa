"use client";

import { Pencil, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete: () => void;
  hideEdit?: boolean;
}

export default function ActionButtons({
  onEdit,
  onDelete,
  hideEdit = false,
}: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      {!hideEdit && (
        <button
          onClick={onEdit}
          className="p-1.5 rounded text-[#9a9a9a] hover:text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <Pencil size={14} />
        </button>
      )}
      <button
        onClick={onDelete}
        className="p-1.5 rounded text-[#9a9a9a] hover:text-[#dc2626] hover:bg-[#2a2a2a] transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

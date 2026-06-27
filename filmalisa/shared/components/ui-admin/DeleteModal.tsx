"use client";

import { Loader2 } from "lucide-react";
import AdminModal from "@/shared/components/ui-admin/AdminModal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  itemLabel: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  resourceName,
  itemLabel,
  onConfirm,
  isLoading,
}: DeleteModalProps) {
  return (
    <AdminModal
      title={`Delete ${resourceName}`}
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#9a9a9a] hover:text-white border border-[#2a2a2a] hover:border-[#444] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </>
      }
    >
      <p className="text-sm text-[#f0f0f0]">
        Are you sure you want to delete &quot;{itemLabel}&quot;?
      </p>
      <p className="text-sm text-[#9a9a9a] mt-1">
        This action cannot be undone.
      </p>
    </AdminModal>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal from "@/shared/components/ui-admin/AdminModal";
import FormField, { inputClass } from "@/shared/components/ui-admin/FormField";
import { useCreateCategory, useUpdateCategory } from "@/lib/admin/hooks/useAdminCategories";
import type { AdminCategory } from "@/lib/admin/types/admin";

interface CategoryFormModalProps {
  mode: "create" | "edit";
  initialData?: AdminCategory;
  onClose: () => void;
}

export default function CategoryFormModal({
  mode,
  initialData,
  onClose,
}: CategoryFormModalProps) {
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const isPending = createCategory.isPending || updateCategory.isPending;
  const [name, setName] = useState(initialData?.name ?? "");

  function handleSubmit() {
    if (mode === "create") {
      createCategory.mutate({ name }, { onSuccess: onClose });
    } else {
      updateCategory.mutate({ id: initialData!.id, payload: { name } }, { onSuccess: onClose });
    }
  }

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={mode === "create" ? "Create Category" : "Edit Category"}
      size="sm"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-[#9a9a9a] hover:text-white border border-[#2a2a2a] hover:border-[#444] rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </>
      }
    >
      <FormField label="Name">
        <input
          className={inputClass}
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
    </AdminModal>
  );
}

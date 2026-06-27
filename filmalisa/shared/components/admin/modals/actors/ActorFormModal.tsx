"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import AdminModal from "@/shared/components/ui-admin/AdminModal";
import FormField, { inputClass } from "@/shared/components/ui-admin/FormField";
import { useCreateActor, useUpdateActor } from "@/lib/admin/hooks/useAdminActors";
import type { AdminActor } from "@/lib/admin/types/admin";

interface ActorFormModalProps {
  mode: "create" | "edit";
  initialData?: AdminActor;
  onClose: () => void;
}

export default function ActorFormModal({
  mode,
  initialData,
  onClose,
}: ActorFormModalProps) {
  const createActor = useCreateActor();
  const updateActor = useUpdateActor();
  const isPending = createActor.isPending || updateActor.isPending;

  const [name, setName] = useState(initialData?.name ?? "");
  const [surname, setSurname] = useState(initialData?.surname ?? "");
  const [imgUrl, setImgUrl] = useState(initialData?.img_url ?? "");

  function handleSubmit() {
    if (mode === "create") {
      createActor.mutate(
        { name, surname, img_url: imgUrl },
        { onSuccess: onClose }
      );
    } else {
      updateActor.mutate(
        { id: initialData!.id, payload: { name, surname, img_url: imgUrl } },
        { onSuccess: onClose }
      );
    }
  }

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={mode === "create" ? "Create Actor" : "Edit Actor"}
      size="md"
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
          placeholder="First name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormField>
      <FormField label="Surname">
        <input
          className={inputClass}
          placeholder="Last name"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </FormField>
      <FormField label="Image URL">
        <input
          className={inputClass}
          placeholder="https://..."
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </FormField>
    </AdminModal>
  );
}

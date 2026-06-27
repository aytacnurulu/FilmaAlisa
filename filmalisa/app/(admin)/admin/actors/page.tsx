"use client";

import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import ActionButtons from "@/shared/components/ui-admin/ActionButtons";
import { useAdminActors } from "@/lib/admin/hooks/useAdminActors";
import { useModal } from "@/lib/modal/ModalContext";
import type { AdminActor } from "@/lib/admin/types/admin";

const columns = ["ID", "Name", "Surname", "Image", "Actions"];

export default function ActorsPage() {
  const { data: actors, isLoading } = useAdminActors();
  const { openModal } = useModal();

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Actors"
        onCreateClick={() => openModal("create", "actor")}
      />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!actors?.length}
        >
          {actors?.map((actor: AdminActor) => (
            <tr
              key={actor.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{actor.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{actor.name}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{actor.surname}</td>
              <td className="px-4 py-3">
                {actor.img_url ? (
                  <img
                    src={actor.img_url}
                    alt={actor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#2a2a2a]" />
                )}
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  onEdit={() => openModal("edit", "actor", actor)}
                  onDelete={() => openModal("delete", "actor", actor)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}

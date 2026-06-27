"use client";

import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import ActionButtons from "@/shared/components/ui-admin/ActionButtons";
import { useAdminCategories } from "@/lib/admin/hooks/useAdminCategories";
import { useModal } from "@/lib/modal/ModalContext";
import type { AdminCategory } from "@/lib/admin/types/admin";

const columns = ["ID", "Name", "Created At", "Actions"];

export default function CategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories();
  const { openModal } = useModal();

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Categories"
        onCreateClick={() => openModal("create", "category")}
      />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!categories?.length}
        >
          {categories?.map((category: AdminCategory) => (
            <tr
              key={category.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{category.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{category.name}</td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {new Date(category.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  onEdit={() => openModal("edit", "category", category)}
                  onDelete={() => openModal("delete", "category", category)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}

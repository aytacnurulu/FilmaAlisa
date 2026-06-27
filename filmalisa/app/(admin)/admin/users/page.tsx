"use client";

import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import { useAdminUsers } from "@/lib/admin/hooks/useAdminUsers";
import type { AdminUser } from "@/lib/admin/types/admin";

const columns = ["ID", "Full Name", "Email", "Image", "Created At"];

export default function UsersPage() {
  const { data: users, isLoading } = useAdminUsers();

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Users" />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!users?.length}
        >
          {users?.map((user: AdminUser) => (
            <tr
              key={user.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{user.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{user.full_name}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{user.email}</td>
              <td className="px-4 py-3">
                {user.img_url ? (
                  <img
                    src={user.img_url}
                    alt={user.full_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#2a2a2a]" />
                )}
              </td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}

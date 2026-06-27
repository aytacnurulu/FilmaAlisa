"use client";

import { useState } from "react";
import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import ActionButtons from "@/shared/components/ui-admin/ActionButtons";
import DeleteModal from "@/shared/components/ui-admin/DeleteModal";
import { useAdminContacts, useDeleteContact } from "@/lib/admin/hooks/useAdminContacts";
import type { AdminContact } from "@/lib/admin/types/admin";

const columns = ["ID", "Full Name", "Email", "Reason", "Created At", "Actions"];

export default function ContactsPage() {
  const { data: contacts, isLoading } = useAdminContacts();
  const deleteContact = useDeleteContact();

  const [selected, setSelected] = useState<AdminContact | null>(null);

  function handleDeleteConfirm() {
    if (!selected) return;
    deleteContact.mutate(selected.id, { onSuccess: () => setSelected(null) });
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Contacts" />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!contacts?.length}
        >
          {contacts?.map((contact: AdminContact) => (
            <tr
              key={contact.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{contact.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{contact.full_name}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{contact.email}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0] max-w-xs truncate">
                {contact.reason}
              </td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {new Date(contact.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  hideEdit
                  onDelete={() => setSelected(contact)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>

      <DeleteModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        resourceName="Contact"
        itemLabel={selected?.full_name ?? ""}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteContact.isPending}
      />
    </div>
  );
}

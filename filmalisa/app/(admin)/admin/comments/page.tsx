"use client";

import { useState } from "react";
import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import ActionButtons from "@/shared/components/ui-admin/ActionButtons";
import DeleteModal from "@/shared/components/ui-admin/DeleteModal";
import { useAdminComments, useDeleteComment } from "@/lib/admin/hooks/useAdminComments";
import type { AdminComment } from "@/lib/admin/types/admin";

const columns = ["ID", "User", "Movie", "Comment", "Created At", "Actions"];

export default function CommentsPage() {
  const { data: comments, isLoading } = useAdminComments();
  const deleteComment = useDeleteComment();

  const [selected, setSelected] = useState<AdminComment | null>(null);

  function handleDeleteConfirm() {
    if (!selected) return;
    deleteComment.mutate(
      { movieId: selected.movie.id, commentId: selected.id },
      { onSuccess: () => setSelected(null) }
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader title="Comments" />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!comments?.length}
        >
          {comments?.map((comment: AdminComment) => (
            <tr
              key={comment.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{comment.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{comment.user.full_name}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{comment.movie.title}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0] max-w-xs truncate">
                {comment.comment}
              </td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {new Date(comment.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  hideEdit
                  onDelete={() => setSelected(comment)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>

      <DeleteModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        resourceName="Comment"
        itemLabel={selected?.comment ?? ""}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteComment.isPending}
      />
    </div>
  );
}

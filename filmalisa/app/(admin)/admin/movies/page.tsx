"use client";

import AdminHeader from "@/shared/components/admin/layout/AdminHeader";
import AdminTable from "@/shared/components/ui-admin/AdminTable";
import ActionButtons from "@/shared/components/ui-admin/ActionButtons";
import { useAdminMovies } from "@/lib/admin/hooks/useAdminMovies";
import { useModal } from "@/lib/modal/ModalContext";
import type { AdminMovie } from "@/lib/admin/types/admin";

const columns = ["ID", "Title", "Category", "IMDB", "Runtime", "Adult", "Created At", "Actions"];

export default function MoviesPage() {
  const { data: movies, isLoading } = useAdminMovies();
  const { openModal } = useModal();

  return (
    <div className="flex flex-col h-full">
      <AdminHeader
        title="Movies"
        onCreateClick={() => openModal("create", "movie")}
      />
      <div className="p-6">
        <AdminTable
          columns={columns}
          isLoading={isLoading}
          isEmpty={!movies?.length}
        >
          {movies?.map((movie: AdminMovie) => (
            <tr
              key={movie.id}
              className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{movie.id}</td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0] max-w-[180px] truncate">
                {movie.title}
              </td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">
                {movie.category?.name ?? "—"}
              </td>
              <td className="px-4 py-3 text-sm text-[#f0f0f0]">{movie.imdb}</td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {movie.run_time_min} min
              </td>
              <td className="px-4 py-3 text-sm">
                {movie.adult ? (
                  <span className="px-2 py-0.5 bg-[#7c3aed]/20 text-[#a78bfa] text-xs rounded-full">
                    18+
                  </span>
                ) : (
                  <span className="text-[#9a9a9a]">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-[#9a9a9a]">
                {new Date(movie.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <ActionButtons
                  onEdit={() => openModal("edit", "movie", movie)}
                  onDelete={() => openModal("delete", "movie", movie)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}

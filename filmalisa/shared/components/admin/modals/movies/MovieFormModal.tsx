"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import AdminModal from "@/shared/components/ui-admin/AdminModal";
import FormField, {
  inputClass,
  selectClass,
  textareaClass,
} from "@/shared/components/ui-admin/FormField";
import { useCreateMovie, useUpdateMovie } from "@/lib/admin/hooks/useAdminMovies";
import { useAdminCategories } from "@/lib/admin/hooks/useAdminCategories";
import { useAdminActors } from "@/lib/admin/hooks/useAdminActors";
import { adminFetch } from "@/lib/admin/adminFetch";
import type { AdminMovie, CreateMoviePayload } from "@/lib/admin/types/admin";

// ── Inner form — mounts only when `data` is guaranteed to be hydrated ────────
interface MovieFormInnerProps {
  mode: "create" | "edit";
  data: AdminMovie | undefined;
  onSubmit: (payload: CreateMoviePayload) => void;
}

function MovieFormInner({ mode, data, onSubmit }: MovieFormInnerProps) {
  const { data: categories } = useAdminCategories();
  const { data: actors } = useAdminActors();

  const [title, setTitle] = useState(data?.title ?? "");
  const [coverUrl, setCoverUrl] = useState(data?.cover_url ?? "");
  const [fragman, setFragman] = useState(data?.fragman ?? "");
  const [watchUrl, setWatchUrl] = useState(data?.watch_url ?? "");
  const [adult, setAdult] = useState(data?.adult ?? false);
  const [runTimeMin, setRunTimeMin] = useState(data?.run_time_min?.toString() ?? "");
  const [imdb, setImdb] = useState(data?.imdb ?? "");
  const [categoryId, setCategoryId] = useState<number | "">(data?.category?.id ?? "");
  const [selectedActors, setSelectedActors] = useState<number[]>(
    data?.actors?.map((a) => a.id) ?? []
  );
  const [overview, setOverview] = useState(data?.overview ?? "");

  function toggleActor(id: number) {
    setSelectedActors((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!categoryId) return;
    onSubmit({
      title,
      cover_url: coverUrl,
      fragman,
      watch_url: watchUrl,
      adult,
      run_time_min: Number(runTimeMin),
      imdb,
      category: categoryId as number,
      actors: selectedActors,
      overview,
    });
  }

  return (
    <form id="movie-form" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <FormField label="Title">
            <input
              className={inputClass}
              placeholder="Movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Cover URL">
          <input
            className={inputClass}
            placeholder="https://..."
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
          />
        </FormField>

        <FormField label="Watch URL">
          <input
            className={inputClass}
            placeholder="https://..."
            value={watchUrl}
            onChange={(e) => setWatchUrl(e.target.value)}
          />
        </FormField>

        <div className="col-span-2">
          <FormField label="Trailer (YouTube embed URL)">
            <input
              className={inputClass}
              placeholder="https://www.youtube.com/embed/..."
              value={fragman}
              onChange={(e) => setFragman(e.target.value)}
            />
          </FormField>
        </div>

        <FormField label="Runtime (min)">
          <input
            className={inputClass}
            type="number"
            placeholder="120"
            value={runTimeMin}
            onChange={(e) => setRunTimeMin(e.target.value)}
          />
        </FormField>

        <FormField label="IMDB Rating">
          <input
            className={inputClass}
            placeholder="6.5"
            value={imdb}
            onChange={(e) => setImdb(e.target.value)}
          />
        </FormField>

        <FormField label="Category">
          <select
            className={selectClass}
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value ? Number(e.target.value) : "")
            }
          >
            <option value="">Select category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Adult">
          <div className="flex items-center h-9">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={adult}
                onChange={(e) => setAdult(e.target.checked)}
                className="w-4 h-4 accent-[#7c3aed]"
              />
              <span className="text-sm text-[#f0f0f0]">18+ content</span>
            </label>
          </div>
        </FormField>

        <div className="col-span-2">
          <FormField label="Actors">
            <div className="border border-[#2a2a2a] rounded-md bg-[#0f0f0f] p-2 max-h-32 overflow-y-auto flex flex-wrap gap-x-4 gap-y-1">
              {actors?.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center gap-1.5 cursor-pointer py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedActors.includes(a.id)}
                    onChange={() => toggleActor(a.id)}
                    className="w-3.5 h-3.5 accent-[#7c3aed]"
                  />
                  <span className="text-xs text-[#f0f0f0]">
                    {a.name} {a.surname}
                  </span>
                </label>
              ))}
            </div>
          </FormField>
        </div>

        <div className="col-span-2">
          <FormField label="Overview">
            <textarea
              className={textareaClass}
              rows={3}
              placeholder="Movie description..."
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </FormField>
        </div>
      </div>
    </form>
  );
}

// ── Outer wrapper — owns mutations + loading state, gates inner render ────────
export default function MovieFormModal({
  mode,
  initialData,
  onClose,
}: {
  mode: "create" | "edit";
  initialData?: AdminMovie;
  onClose: () => void;
}) {
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const isPending = createMovie.isPending || updateMovie.isPending;

  const { data: detail, isPending: isLoadingDetail } = useQuery({
    queryKey: ["admin-movie-detail", initialData?.id],
    queryFn: async () => {
      const json = await adminFetch<{ data: AdminMovie }>(
        `/api/admin/movies/${initialData!.id}`
      );
      return json.data;
    },
    enabled: mode === "edit" && !!initialData?.id,
  });

  const isReady = mode === "create" || !!detail;

  function onSubmit(payload: CreateMoviePayload) {
    if (mode === "create") {
      createMovie.mutate(payload, { onSuccess: onClose });
    } else {
      updateMovie.mutate(
        { id: initialData!.id, payload },
        { onSuccess: onClose }
      );
    }
  }

  return (
    <AdminModal
      isOpen={true}
      onClose={onClose}
      title={mode === "create" ? "Create Movie" : "Edit Movie"}
      size="md"
      footer={
        isReady ? (
          <>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#9a9a9a] hover:text-white border border-[#2a2a2a] hover:border-[#444] rounded-md transition-colors"
            >
              Cancel
            </button>
            {/* type="submit" + form="movie-form" submits the form in MovieFormInner */}
            <button
              type="submit"
              form="movie-form"
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
        ) : null
      }
    >
      {!isReady ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 size={24} className="animate-spin text-[#7c3aed]" />
        </div>
      ) : (
        <MovieFormInner
          key={detail?.id ?? "create"}
          mode={mode}
          data={mode === "edit" ? detail : undefined}
          onSubmit={onSubmit}
        />
      )}
    </AdminModal>
  );
}

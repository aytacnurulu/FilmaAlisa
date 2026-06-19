# CLAUDE-admin.md — Claude Code Rules for Admin Panel

> Read this file at the start of every session involving `app/(admin)/` or `components/admin/`.
> Also read: DESIGN-admin.md (visual rules) and STRUCTURE-admin.md (file map).

---

## Non-Negotiable Rules

1. **Plan mode first.** Before writing a single line, enter plan mode (Shift+Tab in Claude Code).
   Present the plan, wait for approval, then implement.

2. **One file at a time.** Never open more than one file to edit simultaneously.
   Finish a file, confirm it works, then move on.

3. **Read DESIGN-admin.md before any component.** Every className must match the design tokens there.
   No improvising colors, spacing, or border radii.

4. **Never skip the build order.** Types → BFF routes → Modal system → Shared UI → Layout → Hooks → Modals → Pages.
   If a layer is missing, stop and ask.

5. **No `any` types.** Every function parameter, return value, and API response must be typed.
   Import types from `lib/admin/types/admin.ts`.

6. **Never call the Filmalisa API directly from a page or component.**
   All data flows through: `Component → TanStack hook → /api/admin/* route → proxyToFilmalisa() → Filmalisa API`

---

## What Claude Code Should NOT Do

- Do not install new packages without asking first.
- Do not create files outside the paths defined in STRUCTURE-admin.md.
- Do not write inline styles. All styles use Tailwind utility classes.
- Do not use `useState` for server data — that belongs in TanStack Query.
- Do not write form logic. Leave a `// TODO: Aytac implements form logic here` comment in modal bodies.
- Do not add Framer Motion to admin components. Plain CSS transitions only.
- Do not use `console.log` in committed code. Remove all debug logs.

---

## Patterns to Follow

### BFF Route Handler Pattern

Every admin route handler follows this exact shape:

```ts
// app/api/admin/movies/route.ts
import { proxyToFilmalisa } from "@/lib/api/proxy";
import { NextResponse } from "next/server";

export async function GET() {
  return proxyToFilmalisa("GET", "/admin/movies");
}

export async function POST(request: Request) {
  const body = await request.json();
  return proxyToFilmalisa("POST", "/admin/movies", body);
}
```

```ts
// app/api/admin/movies/[id]/route.ts
import { proxyToFilmalisa } from "@/lib/api/proxy";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Params) {
  const { id } = await context.params;
  const body = await request.json();
  return proxyToFilmalisa("PUT", `/admin/movie/${id}`, body);
}

export async function DELETE(_: Request, context: Params) {
  const { id } = await context.params;
  return proxyToFilmalisa("DELETE", `/admin/movie/${id}`);
}
```

### TanStack Query Hook Pattern

```ts
// lib/admin/hooks/useAdminCategories.ts
"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AdminCategory,
  CreateCategoryPayload,
} from "@/lib/admin/types/admin";

const QUERY_KEY = ["admin-categories"];

export function useAdminCategories() {
  return useQuery<AdminCategory[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const json = await res.json();
      return json.data;
    },
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCategoryPayload) => {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
```

### Modal Usage Pattern (on a page)

```tsx
// app/(admin)/admin/movies/page.tsx
"use client";
import { useModal } from "@/lib/modal/ModalContext";
import { useAdminMovies } from "@/lib/admin/hooks/useAdminMovies";
import AdminTable from "@/components/admin/ui/AdminTable";
import ActionButtons from "@/components/admin/ui/ActionButtons";

export default function MoviesPage() {
  const { data: movies, isLoading } = useAdminMovies();
  const { openModal } = useModal();

  return (
    <AdminTable
      columns={["ID", "Title", "Overview", "Category", "Actions"]}
      isLoading={isLoading}
      isEmpty={!movies?.length}
    >
      {movies?.map((movie) => (
        <tr
          key={movie.id}
          className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors"
        >
          <td className="px-4 py-3 text-sm text-[#f0f0f0]">{movie.id}</td>
          <td className="px-4 py-3 text-sm text-[#f0f0f0]">{movie.title}</td>
          <td className="px-4 py-3 text-sm text-[#9a9a9a] max-w-[240px] truncate">
            {movie.overview}
          </td>
          <td className="px-4 py-3 text-sm text-[#f0f0f0]">
            {movie.category?.name}
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
  );
}
```

### Delete Modal Pattern

```tsx
// Inside ModalProvider switch — delete case
case 'delete':
  return (
    <DeleteModal
      isOpen={state.isOpen}
      onClose={closeModal}
      resourceName="movie"
      itemLabel={(state.data as AdminMovie).title}
      onConfirm={() => {
        deleteMovie.mutate((state.data as AdminMovie).id, {
          onSuccess: closeModal,
        })
      }}
      isLoading={deleteMovie.isPending}
    />
  )
```

---

## TypeScript Types Reference

Define all of these in `lib/admin/types/admin.ts` before writing any hooks:

```ts
// Responses from Filmalisa wrap data in: { message, data, result }
interface ApiResponse<T> {
  message: string;
  data: T;
  result: boolean;
}

interface AdminCategory {
  id: number;
  name: string;
  created_at: string;
}

interface AdminActor {
  id: number;
  name: string;
}

interface AdminMovie {
  id: number;
  title: string;
  cover_url: string;
  overview: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  category: AdminCategory;
  actors: AdminActor[];
  created_at: string;
}

interface AdminUser {
  id: number;
  full_name: string;
  email: string;
  img_url: string | null;
  created_at: string;
}

interface AdminComment {
  id: number;
  user: Pick<AdminUser, "id" | "full_name">;
  movie: Pick<AdminMovie, "id" | "title">;
  comment: string;
  created_at: string;
}

interface AdminContact {
  id: number;
  full_name: string;
  email: string;
  reason: string;
  created_at: string;
}

interface DashboardStats {
  movies: number;
  categories: number;
  users: number;
}

// Mutation payloads
interface CreateMoviePayload {
  title: string;
  cover_url: string;
  fragman: string;
  watch_url: string;
  adult: boolean;
  run_time_min: number;
  imdb: string;
  category: number; // category id
  actors: number[]; // actor ids
  overview: string;
}

interface CreateCategoryPayload {
  name: string;
}

interface CreateActorPayload {
  name: string;
}
```

---

## Commit Strategy

After each working slice:

```
git add .
git commit -m "admin: add [what you built]"
```

Suggested commit points:

- `admin: add types (admin.ts)`
- `admin: add BFF routes for categories`
- `admin: add modal system (ModalContext + ModalProvider)`
- `admin: add shared UI components`
- `admin: add admin layout (sidebar + header)`
- `admin: add useAdminCategories hook`
- `admin: add categories page with CRUD`
- (repeat per resource)

---

## Quick Reference: Filmalisa API Notes

- `PUT /admin/movie/[id]` — note: singular `movie`, not `movies`
- `PUT /admin/category/[id]` — note: singular `category`
- `PUT /admin/actor/[id]` — note: singular `actor`
- Movie create requires `category` as ID (number), `actors` as array of IDs
- `imdb` is sent as a string (e.g. `"7.5"`), not a number
- Dashboard endpoint: `GET /admin/dashboard` returns `{ movies, categories, users }`
- Comment delete requires both `movieId` and `commentId`

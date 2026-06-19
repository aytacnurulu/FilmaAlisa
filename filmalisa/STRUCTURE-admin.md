# STRUCTURE-admin.md — Admin Panel File Map

> Every file the admin panel needs, what it does, and where it lives.
> Build in the order listed — each section depends on the one above it.

---

## Folder Tree

```
app/
└── (admin)/
    ├── layout.tsx                    # Admin shell: sidebar + header wrapper
    ├── admin/
    │   ├── dashboard/
    │   │   └── page.tsx              # GET /admin/dashboard → stat cards
    │   ├── movies/
    │   │   └── page.tsx              # GET /admin/movies → table + CRUD modals
    │   ├── categories/
    │   │   └── page.tsx              # GET /admin/categories → table + CRUD modals
    │   ├── actors/
    │   │   └── page.tsx              # GET /admin/actors → table + CRUD modals
    │   ├── users/
    │   │   └── page.tsx              # GET /admin/users → read-only table
    │   ├── comments/
    │   │   └── page.tsx              # GET /admin/comments → table + delete modal
    │   └── contacts/
    │       └── page.tsx              # GET /admin/contacts → table + view + delete

components/
└── admin/
    ├── layout/
    │   ├── AdminSidebar.tsx          # Fixed sidebar with nav links + logout
    │   ├── AdminHeader.tsx           # Sticky header with title + create btn + avatar
    │   └── AdminNav.tsx              # Nav item list (used inside sidebar)
    ├── ui/
    │   ├── AdminTable.tsx            # Generic table wrapper (thead + tbody slots)
    │   ├── AdminModal.tsx            # Base modal shell (overlay + panel + header + footer)
    │   ├── DeleteModal.tsx           # Confirm delete variant (wraps AdminModal)
    │   ├── FormField.tsx             # Label + input/select/textarea wrapper
    │   ├── ActionButtons.tsx         # Edit + Delete icon buttons (table actions column)
    │   └── StatCard.tsx              # Dashboard metric card
    └── modals/
        ├── movies/
        │   ├── CreateMovieModal.tsx  # Form: all movie fields
        │   └── EditMovieModal.tsx    # Same form, pre-filled
        ├── categories/
        │   ├── CreateCategoryModal.tsx
        │   └── EditCategoryModal.tsx
        └── actors/
            ├── CreateActorModal.tsx
            └── EditActorModal.tsx

lib/
├── admin/
│   ├── hooks/
│   │   ├── useAdminMovies.ts         # TanStack Query: list + create + update + delete
│   │   ├── useAdminCategories.ts
│   │   ├── useAdminActors.ts
│   │   ├── useAdminUsers.ts
│   │   ├── useAdminComments.ts
│   │   ├── useAdminContacts.ts
│   │   └── useAdminDashboard.ts
│   └── types/
│       └── admin.ts                  # AdminMovie, AdminCategory, AdminActor, DashboardStats, etc.
└── modal/
    ├── ModalContext.tsx              # React context: openModal / closeModal / current modal state
    └── ModalProvider.tsx             # Portalled provider — renders modal into document.body

app/
└── api/
    └── admin/
        ├── movies/
        │   ├── route.ts              # GET /api/admin/movies, POST /api/admin/movies
        │   └── [id]/
        │       └── route.ts          # PUT /api/admin/movies/[id], DELETE /api/admin/movies/[id]
        ├── categories/
        │   ├── route.ts
        │   └── [id]/
        │       └── route.ts
        ├── actors/
        │   ├── route.ts
        │   └── [id]/
        │       └── route.ts
        ├── users/
        │   └── route.ts              # GET only
        ├── comments/
        │   └── [movieId]/
        │       └── [commentId]/
        │           └── route.ts      # DELETE only
        ├── contacts/
        │   ├── route.ts              # GET list
        │   └── [id]/
        │       └── route.ts          # DELETE
        └── dashboard/
            └── route.ts              # GET stats
```

---

## Build Order

Build each layer completely before moving to the next.

### Layer 0 — Types
`lib/admin/types/admin.ts`
Define all TypeScript interfaces before writing any hooks or components.

### Layer 1 — BFF Route Handlers
`app/api/admin/**`
Proxy calls using `proxyToFilmalisa()`. One file per resource.
No logic — just read cookie, forward request, return response.

### Layer 2 — Modal System
`lib/modal/ModalContext.tsx` + `ModalProvider.tsx`
Build this once. All CRUD pages depend on it.

### Layer 3 — Shared UI Components
`components/admin/ui/**`
`AdminModal`, `DeleteModal`, `FormField`, `ActionButtons`, `StatCard`, `AdminTable`
Build these before any page — pages import them.

### Layer 4 — Admin Layout
`app/(admin)/layout.tsx` + `components/admin/layout/**`
`AdminSidebar` + `AdminHeader` — the shell that wraps every admin page.

### Layer 5 — TanStack Query Hooks
`lib/admin/hooks/**`
One hook file per resource. Each exports: `useList`, `useCreate`, `useUpdate`, `useDelete`.

### Layer 6 — CRUD Modals
`components/admin/modals/**`
Form modals per resource. Import shared `AdminModal`, `FormField`.

### Layer 7 — Pages
`app/(admin)/admin/**/page.tsx`
Each page: fetch list via hook → render `AdminTable` → wire `ActionButtons` to `useModal`.

### Recommended page build order
1. Dashboard (no modals, just stat cards — good warmup)
2. Categories (simplest CRUD — just a name field)
3. Actors (same as categories)
4. Movies (most complex — multi-field form, category select, actor multi-select)
5. Users (read-only — no create/edit/delete)
6. Comments (delete only)
7. Contacts (view + delete)

---

## Key File Responsibilities

### `lib/modal/ModalContext.tsx`
```ts
type ModalType = 'create' | 'edit' | 'delete' | 'view'
type ModalResource = 'movie' | 'category' | 'actor' | 'comment' | 'contact'

interface ModalState {
  isOpen: boolean
  type: ModalType | null
  resource: ModalResource | null
  data: unknown | null      // the row being edited/deleted
}

interface ModalContextValue {
  state: ModalState
  openModal: (type: ModalType, resource: ModalResource, data?: unknown) => void
  closeModal: () => void
}
```

### `lib/modal/ModalProvider.tsx`
- Wraps `app/(admin)/layout.tsx` children
- Renders the correct modal component via a switch on `state.resource + state.type`
- Portals to `document.body` with `createPortal`

### `components/admin/ui/AdminModal.tsx`
Props:
```ts
interface AdminModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode       // form body
  footer?: React.ReactNode        // cancel + action buttons
  size?: 'sm' | 'md' | 'lg'      // controls max-w: sm=384, md=512, lg=640
}
```

### `lib/admin/hooks/useAdminMovies.ts`
Exports:
```ts
useAdminMovies()        // { data, isLoading, error }
useCreateMovie()        // useMutation → POST /api/admin/movies
useUpdateMovie()        // useMutation → PUT /api/admin/movies/[id]
useDeleteMovie()        // useMutation → DELETE /api/admin/movies/[id]
```
All mutations call `queryClient.invalidateQueries(['admin-movies'])` on success.

---

## API Route Mapping

| Next.js route | Method | Filmalisa endpoint |
|---|---|---|
| `/api/admin/movies` | GET | `GET /admin/movies` |
| `/api/admin/movies` | POST | `POST /admin/movies` |
| `/api/admin/movies/[id]` | PUT | `PUT /admin/movie/[id]` |
| `/api/admin/movies/[id]` | DELETE | `DELETE /admin/movie/[id]` |
| `/api/admin/categories` | GET | `GET /admin/categories` |
| `/api/admin/categories` | POST | `POST /admin/categories` |
| `/api/admin/categories/[id]` | PUT | `PUT /admin/category/[id]` |
| `/api/admin/categories/[id]` | DELETE | `DELETE /admin/category/[id]` |
| `/api/admin/actors` | GET | `GET /admin/actors` |
| `/api/admin/actors` | POST | `POST /admin/actors` |
| `/api/admin/actors/[id]` | PUT | `PUT /admin/actor/[id]` |
| `/api/admin/actors/[id]` | DELETE | `DELETE /admin/actor/[id]` |
| `/api/admin/users` | GET | `GET /admin/users` |
| `/api/admin/comments/[movieId]/[commentId]` | DELETE | `DELETE /admin/movies/[id]/comment/[cId]` |
| `/api/admin/contacts` | GET | `GET /admin/contacts` |
| `/api/admin/contacts/[id]` | DELETE | `DELETE /admin/contact/[id]` |
| `/api/admin/dashboard` | GET | `GET /admin/dashboard` |
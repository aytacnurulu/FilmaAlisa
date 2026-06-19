# STRUCTURE.md — Filmalisa Project Map

This file describes what exists, where it lives, and what each piece does.
Claude Code must read this before writing any code.
Do NOT reorganize folders. Do NOT rename files. Do NOT create duplicates.

---

## Full file tree

```
filmalisa/
├── app/
│   ├── (admin)/
│   │   ├── admin/
│   │   │   ├── actors/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── comments/page.tsx
│   │   │   ├── contacts/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── movies/page.tsx
│   │   │   └── users/page.tsx
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── (client)/
│   │   ├── landing/
│   │   │   └── _components/
│   │   │       ├── ContactSection.tsx
│   │   │       ├── FaqSection.tsx
│   │   │       ├── FeatureSection.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── LandingFooter.tsx
│   │   │       └── LandingNavbar.tsx
│   │   ├── movies/
│   │   │   ├── [id]/page.tsx
│   │   │   └── page.tsx
│   │   ├── account/page.tsx        ← Profile edit page (GET + PUT /profile)
│   │   ├── favorites/page.tsx
│   │   ├── home/page.tsx
│   │   ├── search/page.tsx
│   │   ├── layout.tsx              ← Client layout: sidebar + main area
│   │   └── page.tsx
│   ├── api/
│   │   ├── admin/
│   │   │   ├── actors/[id]/route.ts
│   │   │   ├── actors/route.ts
│   │   │   ├── categories/[id]/route.ts
│   │   │   ├── categories/route.ts
│   │   │   ├── comments/route.ts
│   │   │   ├── contacts/[id]/route.ts
│   │   │   ├── contacts/route.ts
│   │   │   ├── dashboard/route.ts
│   │   │   ├── movies/[id]/comment/[commentId]/route.ts
│   │   │   ├── movies/[id]/route.ts
│   │   │   ├── movies/route.ts
│   │   │   └── users/route.ts
│   │   ├── auth/
│   │   │   ├── admin-login/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── signup/route.ts
│   │   ├── movie/[id]/favorite/route.ts   ← singular "movie" (toggle favorite)
│   │   ├── movies/
│   │   │   ├── [id]/comment/[commentId]/route.ts
│   │   │   ├── [id]/comments/route.ts
│   │   │   ├── [id]/favorite/route.ts
│   │   │   ├── [id]/route.ts
│   │   │   ├── favorites/route.ts
│   │   │   └── route.ts
│   │   ├── categories/route.ts
│   │   ├── contact/route.ts
│   │   └── profile/route.ts               ← GET + PUT /profile
│   ├── globals.css                         ← Tailwind v4 @theme design tokens
│   ├── layout.tsx                          ← Root layout (Providers, fonts)
│   ├── not-found.tsx
│   ├── page.tsx
│   └── providers.tsx                       ← TanStack QueryClientProvider
├── features/
│   ├── home/components/
│   │   ├── CategoryRow.tsx
│   │   ├── CategorySection.tsx
│   │   └── HeroSlider.tsx
│   ├── movieDetail/components/
│   │   ├── CommentSection.tsx
│   │   ├── MetaItem.tsx
│   │   ├── SimilarMovieCard.tsx
│   │   └── SimilarMovies.tsx
│   └── movies/components/
│       ├── MovieFilters.tsx
│       └── MovieGrid.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts       ← apiFetch() — browser-only, calls /api/* routes
│   │   ├── proxy.ts        ← proxyToFilmalisa() — server-only, calls Filmalisa API
│   │   ├── index.ts
│   │   ├── categories.ts   ← useGetCategories
│   │   ├── comment.ts      ← useGetComments, useCreateComment, useDeleteComment
│   │   ├── contact.ts      ← useSubmitContact
│   │   ├── favorite.ts     ← useGetFavorites, useToggleFavorite
│   │   ├── movies.ts       ← useGetMovies, useGetMovieById
│   │   └── profile.ts      ← useGetProfile, useUpdateProfile
│   ├── auth/
│   │   └── index.ts        ← getTokenFromCookie(), session helpers
│   ├── types/
│   │   ├── category.ts
│   │   ├── comment.ts
│   │   ├── contact.ts
│   │   ├── movies.ts
│   │   └── profile.ts      ← Profile, UpdateProfilePayload
│   └── validation/
│       └── index.ts        ← Yup schemas
├── shared/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Accordion.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── PasswordInput.tsx    ← already has show/hide toggle built in
│   │   │   └── Rating.tsx
│   │   └── LogoutButton.tsx
│   ├── data/
│   │   └── faq.ts
│   ├── lib/
│   │   └── cn.ts                   ← clsx + tailwind-merge utility
│   └── motion.ts                   ← Framer Motion presets (calm scroll reveals only)
└── middleware.ts                   ← Route protection, redirects to /login
```

---

## Critical rules — read before touching any file

### 1. Two API functions — never swap them

| Function | File | Where used | Calls |
|---|---|---|---|
| `apiFetch` | `lib/api/client.ts` | Client components only | `/api/*` (internal Next.js routes) |
| `proxyToFilmalisa` | `lib/api/proxy.ts` | Route handlers only (`route.ts`) | Filmalisa external API |

`apiFetch` never appears inside `app/api/`. `proxyToFilmalisa` never appears inside a page or component.

### 2. Route handler pattern

Every `route.ts` follows this shape — no exceptions:

```ts
import { proxyToFilmalisa } from "@/lib/api/proxy";

export async function GET() {
  return proxyToFilmalisa("GET", "/endpoint");
}

export async function PUT(request: Request) {
  const body = await request.json();
  return proxyToFilmalisa("PUT", "/endpoint", body);
}
```

### 3. Shared UI lives in `shared/`, not `components/`

```ts
// CORRECT
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { PasswordInput } from "@/shared/components/ui/PasswordInput";
import { cn } from "@/shared/lib/cn";

// WRONG — this path does not exist in this project
import { Button } from "@/components/ui/button";
```

### 4. Feature-specific components live in `features/`

Components used only within one feature go in `features/<name>/components/`.
Components reused across multiple pages go in `shared/components/ui/`.

### 5. Page-specific sub-components

Components used only on one page go in `_components/` next to that page:
```
app/(client)/landing/_components/HeroSection.tsx   ✓
```

### 6. `"use client"` rule

- Pages that use hooks → must have `"use client"` at the top
- `route.ts` files → always server-side, never `"use client"`
- `providers.tsx` → `"use client"` (wraps QueryClientProvider)

### 7. Next.js params (v15+)

```ts
// Server component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// Client component — use React.use(), not async/await
const { id } = use(params);
```

### 8. TanStack Query v5 syntax

```ts
// All options in ONE object
useQuery({ queryKey: ["profile"], queryFn: getProfile });
useMutation({ mutationFn: updateProfile, onSuccess: () => {} });

// queryClient must come from useQueryClient() inside the hook
const queryClient = useQueryClient();
```

---

## Import path aliases

```ts
import { ... } from "@/lib/api/profile";
import { ... } from "@/lib/types/profile";
import { ... } from "@/shared/components/ui/Button";
import { ... } from "@/shared/lib/cn";
import { ... } from "@/features/home/components/HeroSlider";
```

---

## What is complete — do not rebuild

- [x] Auth: login, signup, logout, httpOnly cookie, middleware protection
- [x] BFF route handlers: auth, movies, categories, favorites, comments, profile, contact, all admin
- [x] TanStack Query hooks: movies, categories, favorites, comments, profile, contact
- [x] Shared UI: Button, Input, PasswordInput, Card, Badge, MovieCard, LoadingSpinner, ErrorMessage, Logo, Navbar, Rating, Accordion
- [x] Client layout with sidebar navigation
- [x] Landing page with 6 extracted components
- [x] Home page: CategoryRow, CategorySection, HeroSlider
- [x] Movie list page + movie detail page + CommentSection
- [x] Design system: globals.css tokens, DESIGN.md, DESIGN-admin.md, shared/motion.ts

## What is not yet built

- [ ] `app/(client)/account/page.tsx` — profile view + edit form
- [ ] `app/(client)/favorites/page.tsx` — user's saved movies
- [ ] `app/(client)/search/page.tsx` — search results
- [ ] Admin panel pages (Phase 4 — scaffolded but empty)
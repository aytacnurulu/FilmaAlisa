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
│   │   │   ├── actors/page.tsx                               ← Admin actors CRUD page
│   │   │   ├── categories/page.tsx                           ← Admin categories CRUD page
│   │   │   ├── comments/page.tsx                             ← Admin comment moderation page
│   │   │   ├── contacts/page.tsx                             ← Admin contact submissions page
│   │   │   ├── dashboard/page.tsx                            ← Admin stats dashboard
│   │   │   ├── movies/page.tsx                               ← Admin movies CRUD page
│   │   │   └── users/page.tsx                                ← Admin users list page
│   │   └── layout.tsx                                        ← Admin panel layout (sidebar + auth guard)
│   ├── (auth)/
│   │   ├── login/page.tsx                                    ← Login form page
│   │   ├── signup/page.tsx                                   ← Signup form page
│   │   └── layout.tsx                                        ← Centered card layout for auth pages
│   ├── (client)/
│   │   ├── contact/page.tsx                                  ← Contact form page
│   │   ├── favorites/page.tsx                                ← User's saved movies
│   │   ├── home/page.tsx                                     ← Authenticated home with hero + categories
│   │   ├── landing/
│   │   │   └── _components/
│   │   │       ├── ContactSection.tsx                        ← Landing CTA contact section
│   │   │       ├── FaqSection.tsx                            ← Landing FAQ accordion
│   │   │       ├── FeatureSection.tsx                        ← Landing features section
│   │   │       ├── HeroSection.tsx                           ← Landing hero banner
│   │   │       ├── LandingFooter.tsx                         ← Landing footer
│   │   │       └── LandingNavbar.tsx                         ← Landing navbar (unauthenticated)
│   │   ├── movies/
│   │   │   ├── [id]/page.tsx                                 ← Movie detail page
│   │   │   └── page.tsx                                      ← Movies list with filters
│   │   ├── profile/page.tsx                                  ← Profile view + edit form (GET + PUT /profile)
│   │   ├── layout.tsx                                        ← Client layout: sidebar + main area
│   │   └── page.tsx                                          ← Landing page (public, unauthenticated)
│   ├── api/
│   │   ├── admin/
│   │   │   ├── actors/
│   │   │   │   ├── [id]/route.ts                             ← PUT/DELETE single actor
│   │   │   │   └── route.ts                                  ← GET list / POST create actor
│   │   │   ├── categories/
│   │   │   │   ├── [id]/route.ts                             ← PUT/DELETE single category
│   │   │   │   └── route.ts                                  ← GET list / POST create category
│   │   │   ├── comments/route.ts                             ← GET all comments (admin moderation)
│   │   │   ├── contacts/
│   │   │   │   ├── [id]/route.ts                             ← DELETE single contact submission
│   │   │   │   └── route.ts                                  ← GET all contact submissions
│   │   │   ├── dashboard/route.ts                            ← GET aggregated dashboard stats
│   │   │   ├── movies/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── comment/[commentId]/route.ts          ← DELETE comment (admin)
│   │   │   │   │   └── route.ts                              ← GET/PUT/DELETE single movie
│   │   │   │   └── route.ts                                  ← GET list / POST create movie
│   │   │   └── users/route.ts                                ← GET all users
│   │   ├── auth/
│   │   │   ├── admin-login/route.ts                          ← POST admin login, writes httpOnly cookie
│   │   │   ├── login/route.ts                                ← POST client login, writes httpOnly cookie
│   │   │   ├── logout/route.ts                               ← POST logout, clears cookie
│   │   │   └── signup/route.ts                               ← POST new user registration
│   │   ├── categories/route.ts                               ← GET categories (client)
│   │   ├── contact/route.ts                                  ← POST contact form submission
│   │   ├── movie/[id]/favorite/route.ts                      ← POST toggle favorite (singular "movie")
│   │   ├── movies/
│   │   │   ├── [id]/
│   │   │   │   ├── comment/[commentId]/route.ts              ← DELETE own comment
│   │   │   │   ├── comments/route.ts                         ← GET / POST comments for a movie
│   │   │   │   ├── favorite/route.ts                         ← GET/POST favorite for a movie
│   │   │   │   └── route.ts                                  ← GET single movie detail
│   │   │   ├── favorites/route.ts                            ← GET user's favorited movies
│   │   │   └── route.ts                                      ← GET all movies (with optional ?search)
│   │   └── profile/route.ts                                  ← GET + PUT /profile
│   ├── layout.tsx                                            ← Root layout (Providers, fonts)
│   ├── not-found.tsx                                         ← 404 page
│   ├── page.tsx                                              ← Root redirect to landing
│   └── providers.tsx                                         ← TanStack QueryClientProvider
├── features/
│   ├── contact/
│   │   ├── components/
│   │   │   └── ContactForm.tsx                               ← Contact form component (Formik + Yup)
│   │   └── hooks/
│   │       └── useSubmitContact.ts                           ← useMutation hook for contact submission
│   ├── home/components/
│   │   ├── CategoryRow.tsx                                   ← Horizontal row of movies in a category
│   │   ├── CategorySection.tsx                               ← All category rows combined
│   │   └── HeroSlider.tsx                                    ← Auto-playing hero movie slider
│   ├── movieDetail/components/
│   │   ├── CommentSection.tsx                                ← Comments list + add/delete
│   │   ├── MetaItem.tsx                                      ← Single metadata badge (runtime, IMDB)
│   │   ├── SimilarMovieCard.tsx                              ← Card for a similar movie
│   │   └── SimilarMovies.tsx                                 ← Similar movies section on detail page
│   └── movies/components/
│       ├── MovieFilters.tsx                                  ← Filter/sort controls for movies list
│       └── MovieGrid.tsx                                     ← Responsive grid of MovieCards
├── lib/
│   ├── api/
│   │   ├── categories.ts                                     ← useGetCategories hook
│   │   ├── client.ts                                         ← apiFetch() — browser-only, calls /api/* routes
│   │   ├── comment.ts                                        ← useGetComments, useCreateComment, useDeleteComment
│   │   ├── contact.ts                                        ← useSubmitContact hook
│   │   ├── favorite.ts                                       ← useGetFavorites, useToggleFavorite
│   │   ├── index.ts                                          ← Re-exports all lib/api hooks
│   │   ├── movies.ts                                         ← useGetMovies, useGetMovieById
│   │   ├── profile.ts                                        ← useGetProfile, useUpdateProfile
│   │   └── proxy.ts                                          ← proxyToFilmalisa() — server-only, calls Filmalisa API
│   ├── auth/
│   │   └── index.ts                                          ← getTokenFromCookie(), session helpers
│   ├── types/
│   │   ├── category.ts                                       ← Category type
│   │   ├── comment.ts                                        ← Comment type
│   │   ├── contact.ts                                        ← Contact type
│   │   ├── movies.ts                                         ← Movie, Actor types
│   │   └── profile.ts                                        ← Profile, UpdateProfilePayload types
│   └── validation/
│       └── index.ts                                          ← Yup schemas (login, signup, profile, contact)
└── middleware.ts                                             ← Route protection, redirects to /login
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
- [x] Profile page (`app/(client)/profile/page.tsx`) — view + edit form (GET + PUT /profile)
- [x] Favorites page (`app/(client)/favorites/page.tsx`) — user's saved movies
- [x] Contact page (`app/(client)/contact/page.tsx`) + ContactForm feature component

## What is not yet built

- [ ] `app/(client)/search/page.tsx` — search results
- [ ] Admin panel pages (Phase 4 — scaffolded but empty)
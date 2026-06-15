# CLAUDE.md — Filmalisa

> Single source of truth for AI coding assistants working on this repo.
> Read this file fully before writing any code. **Never add code you cannot explain to yourself.**

---

## 1. Project Summary

**Filmalisa** — Next.js 16 movie catalog with two surfaces in one codebase:

- **Client app** `app/(client)` — public: browse movies, detail, categories, favorites, comments, profile, contact, signup/login.
- **Admin panel** `app/(admin)` — full CRUD: categories, actors, movies, users, comments, contacts + dashboard.

Both authenticate via **JWT Bearer tokens** against the same backend.

---

## 2. Critical Auth Fact (shapes the whole architecture)

**Every endpoint requires a valid token — including client read endpoints (`/movies`, `/categories`).** With a missing/invalid token the API does not return correct data. The app is fully gated behind auth.

Because the token lives in an **httpOnly cookie**, client-side JS cannot read it. So the browser **never calls the Filmalisa API directly**.

### BFF (Backend-for-Frontend) Proxy

```
Browser              Next.js route handler          Filmalisa API
(React Query)  --->  (reads httpOnly cookie)  --->  (needs Bearer token)
               fetch /api/*        attaches Authorization: Bearer <token>
```

Rules:
- All external API access flows through `app/api/*` route handlers (or server actions).
- The httpOnly cookie holds the JWT; `middleware.ts` guards protected routes.
- React Query on the client targets **internal `/api/*` routes**, not the external API.

---

## 3. API Reference

### Base URL

```
https://api.sarkhanrahimli.dev/api/filmalisa
```

All paths below are **relative to the base URL**.

### Headers

| Header | Value | Notes |
| --- | --- | --- |
| `Authorization` | `Bearer <token>` | Required on every endpoint (incl. public reads). |
| `Accept-Language` | `az` \| `en` | Optional localization. |
| `Content-Type` | `application/json` | On POST/PUT with body. |

### Standard Response Envelope

Success:
```json
{ "message": "Ok", "data": { /* ... */ }, "result": true }
```
List endpoints return `data` as an array. Mutations may return `data: null` with a message like `"Successfully removed"`. Create returns HTTP `201`.

---

### 3.1 Authentication

| Method | Path | Body | Purpose |
| --- | --- | --- | --- |
| POST | `/auth/admin/login` | `{ email, password }` | Admin login |
| POST | `/auth/login` | `{ email, password }` | Client login |
| POST | `/auth/signup` | `{ full_name, email, password }` | Client signup |

Login response shape:
```json
{
  "message": "Ok",
  "data": {
    "tokens": { "access_token": "<JWT>" },
    "profile": { "id": 999999, "full_name": "Admin", "email": "admin@admin.com", "img_url": null, "created_at": "..." }
  },
  "result": true
}
```
Signup response: `{ "message": "Successfully registered", "data": null, "result": true }` (201).

Test creds (from collection): admin `admin@admin.com` / `1234`; client `sarkhan@gmail.com` / `1234`.

---

### 3.2 Client (user) endpoints

| Method | Path | Body | Purpose |
| --- | --- | --- | --- |
| GET | `/movies` | — | List movies. Optional query `?search=<term>` (matches title + description). |
| GET | `/movies/{id}` | — | Movie detail (includes `actors[]` + `category`). |
| GET | `/categories` | — | List categories, each with nested `movies[]`. |
| POST | `/movie/{id}/favorite` | empty | **Toggle** favorite (returns "added" or "removed"). Note: singular `movie`. |
| GET | `/movies/favorites` | — | List favorited movies. |
| POST | `/movies/{id}/comment` | `{ comment }` | Create comment. |
| GET | `/movies/{id}/comments` | — | List comments for a movie. |
| DELETE | `/movies/{id}/comment/{commentId}` | — | Delete own comment. |
| GET | `/profile` | — | Get profile. |
| PUT | `/profile` | `{ full_name, email, img_url, password }` | Update profile. |
| POST | `/contact` | `{ full_name, email, reason }` | Submit contact form. |

> ⚠️ Path inconsistency in the backend: favorite **toggle** uses singular `/movie/{id}/favorite`, while comments/lists use plural `/movies/...`. Preserve exactly as written.

---

### 3.3 Admin endpoints

| Method | Path | Body | Purpose |
| --- | --- | --- | --- |
| GET | `/profile` | — | Admin profile (same path as client). |
| GET | `/admin/users` | — | List users. |
| GET | `/admin/dashboard` | — | Dashboard stats. |
| GET | `/admin/categories` | — | List categories. |
| POST | `/admin/category` | `{ name }` | Create category. |
| PUT | `/admin/category/{id}` | `{ name }` | Update category. |
| DELETE | `/admin/category/{id}` | — | Delete category. |
| GET | `/admin/actors` | — | List actors. |
| POST | `/admin/actor` | `{ name, surname, img_url }` | Create actor. |
| PUT | `/admin/actor/{id}` | `{ name, surname, img_url }` | Update actor. |
| DELETE | `/admin/actor/{id}` | — | Delete actor. |
| GET | `/admin/movies` | — | List movies. |
| GET | `/admin/movies/{id}` | — | Movie detail (plural `movies`). |
| POST | `/admin/movie` | movie payload (below) | Create movie (singular `movie`). |
| PUT | `/admin/movie/{id}` | movie payload | Update movie (singular `movie`). |
| DELETE | `/admin/movie/{id}` | — | Delete movie (singular `movie`). |
| GET | `/admin/contacts` | — | List contact submissions. |
| DELETE | `/admin/contact/{id}` | — | Delete contact (singular). |
| GET | `/admin/comments` | — | List all comments (with nested movie). |
| DELETE | `/admin/movies/{id}/comment/{commentId}` | — | Delete a comment (moderation). |

> ⚠️ Collection/create vs single-item naming differs: **lists are plural** (`/admin/categories`, `/admin/actors`, `/admin/movies`, `/admin/contacts`), **single-item mutations are singular** (`/admin/category/{id}`, `/admin/actor/{id}`, `/admin/movie/{id}`, `/admin/contact/{id}`). Movie GET-by-id is the exception: `/admin/movies/{id}` (plural). Copy paths verbatim.

Dashboard response shape:
```json
{ "comments": 1, "users": 4, "favorites": 1, "categories": 15, "movies": 1, "actors": 21, "contacts": 1 }
```

---

### 3.4 Movie create/update payload

```json
{
  "title": "string",
  "cover_url": "string (url)",
  "fragman": "string (youtube embed url)",
  "watch_url": "string (url)",
  "adult": true,
  "run_time_min": 120,
  "imdb": "6.5",
  "category": 1,
  "actors": [22, 10],
  "overview": "string"
}
```
- `category` = single category **id** (number).
- `actors` = array of actor **ids**.
- `imdb` is a **string** ("6.5"), `run_time_min` is a number.
- The **response** expands `category` into an object and `actors` into objects — but the **request** uses ids only.

---

### 3.5 Entity shapes (from responses)

```ts
// Category
{ id: number; name: string; created_at: string }

// Actor
{ id: number; name: string; surname: string; img_url: string | null; created_at: string }

// User / Profile
{ id: number; full_name: string; email: string; img_url: string | null; created_at: string }

// Movie (detail/list)
{
  id: number; title: string; cover_url: string; fragman: string; watch_url: string;
  adult: boolean; run_time_min: number; imdb: string; overview: string; created_at: string;
  category?: Category;          // present on detail / admin create response
  actors?: Actor[];             // present on detail
}

// Comment (movie-scoped list)
{ id: number; comment: string; created_at: string }

// Comment (admin list) — includes nested movie
{ id: number; comment: string; created_at: string; movie: Movie }

// Contact
{ id: number; full_name: string; email: string; reason: string; created_at: string }
```

---

## 4. Tech Stack (locked decisions)

| Concern | Choice | Reason |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) + TypeScript | Route groups for client/admin; RSC + SSR. |
| Data fetching | TanStack Query v5 | Cache, loading/error, optimistic updates. |
| Auth storage | httpOnly cookie | JS cannot read the token. |
| Forms | Formik + Yup | Validation + inferred TS types. |
| Styling | Tailwind CSS v4 (+ optional shadcn/ui) | Speed; in-repo component code. |
| Package manager | pnpm | Fast, disk-efficient. |
| Tooling | ESLint + Prettier, Git from commit #1 | Consistent style; safe rollbacks. |
| Global state | React Query + URL params; Zustand only if needed | Avoid premature complexity. |

---

## 5. Folder Structure

```
app/
  (client)/            # public app routes
  (admin)/             # admin panel routes
  api/                 # BFF route handlers (read cookie, attach token, proxy)
  layout.tsx
lib/
  api/                 # typed API client functions + request wrapper
  auth/                # cookie helpers, session utilities
  validation/          # Zod schemas
middleware.ts          # route protection (redirect if no token)
components/            # shared UI
```

---

## 6. Working Principles

- **Plan first, code second.** Use plan mode (Shift+Tab) before any feature. Approve the plan, then implement.
- **Small, reviewable chunks.** One component / one endpoint / one page at a time.
- **Ask "why".** Prefer explaining trade-offs over just producing code.
- **Review every diff like a junior dev's PR.** Reject anything unexplained.
- **Own the skeleton.** Folder structure, routes, and data flow are decided by the human; delegate repetitive parts (forms, type mappings, CRUD boilerplate).
- **Commit constantly.** One small feature = one commit.

---

## 7. Roadmap

- **Phase 0 — Skeleton.** `pnpm create next-app` (TS, Tailwind, App Router), folder structure, this CLAUDE.md, `git init` + first commit.
- **Phase 1 — Auth foundation.** Login/signup pages, route handler writing token to httpOnly cookie, `middleware.ts`, `lib/api` wrapper + TS types. **Most important phase.**
- **Phase 2 — Client core.** Movies list, detail, categories via React Query.
- **Phase 3 — Client features.** Favorites (toggle + list), comments (create/delete/list), profile (read/edit), contact form.
- **Phase 4 — Admin panel.** Layout + dashboard, then CRUD: Category → Actor → Movie → Users → Comment/Contact moderation. Build the CRUD pattern once, reuse it.
- **Phase 5 — Polish.** Loading/error states, i18n (`Accept-Language` az/en), responsive, deploy (Vercel).

**Notes:** every CRUD module shares one template — build one carefully, replicate. The movie-create form is the most complex (category select, multi-actor select, image/video URLs) — budget extra time.

---

## 8. BFF wrapper reference (implementation note)

A single server-side request helper (`lib/api`) should:
1. Read the JWT from the httpOnly cookie.
2. Prepend `BASE_URL` to the relative path.
3. Attach `Authorization: Bearer <token>` and forward `Accept-Language` if present.
4. Throw/normalize on `result: false` or non-2xx.
5. Return the unwrapped `data` field.

Route handlers in `app/api/*` call this helper and relay the result to React Query on the client. Never expose the token to the browser.
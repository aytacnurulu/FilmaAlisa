# Filmalisa Admin — Design System

This file governs all admin panel UI. Follow it on every admin task.
Shares the same token layer (`globals.css`) as the client — no separate token file.
For any token not listed here, refer to `globals.css` directly.

> These screenshots are inspiration, not a spec to copy pixel-for-pixel.
> Keep the visual DNA (dark bg, violet accent, wide sidebar, data-table driven)
> and improve details with your own judgment.

---

## 1. Non-negotiable rules

Same hard rules as `DESIGN.md` §1, plus:

1. **No ad-hoc colors.** Only tokens from `globals.css`.
2. **All buttons come from `Button`**, all inputs from `Input`. Reuse `shared/ui`.
3. **Icons only from `react-icons/fi`** (Feather outline set).
4. **No animation on data tables or forms.** Motion is limited to:
   - Page entrance: single `revealUp` on the content area (not the sidebar).
   - Modal open/close: `AnimatePresence` + fade + `y: 8→0`. Nothing else.
   - Sidebar active item: CSS color transition only (`--dur-fast`).
5. **Sidebar never animates open/close on desktop** — it is always visible and static.
6. Admin and client share `shared/ui` components. Do NOT duplicate Button, Input, etc.
7. Before creating any new component, check `shared/ui` AND `shared/admin-ui`.

---

## 2. Visual DNA

- **Atmosphere:** same dark cinematic background as client (`bg`, `surface`, `surface-2`).
- **Accent:** same violet-purple (`accent` = #8b3dff). Used more broadly here than on
  client — active sidebar item gets a full `accent` background fill (not just icon color).
- **Logo:** same static gradient triangle + wordmark. No animation.
- **Data-driven:** admin is table and form heavy. UI chrome stays minimal so data is
  the focus. No decorative elements, no hero images.
- **Stat cards:** two tiers — accent-filled (highlighted metrics: Users, Actors) and
  surface-filled (neutral metrics: Favorite actions, Movies, Comments, Categories, Contacts).
  The accent-filled ones draw the eye; use sparingly (max 2–3 per dashboard).

---

## 3. Layout — Admin Shell (all admin pages)

One layout template for all admin pages. No variants.

```
┌────────────────┬──────────────────────────────────────────┐
│  Logo          │  Hi Admin          [Create btn]  [Avatar]│
│  wordmark      │  Page title                              │
│                ├──────────────────────────────────────────┤
│  Dashboard     │                                          │
│  Movies        │  [content: table / cards / form]         │
│  Categories    │                                          │
│  Users         │                                          │
│  Comments      │                                          │
│  Contact us    │                                          │
│  Actors        │                                          │
│                │                                          │
│  Logout        │                                          │
└────────────────┴──────────────────────────────────────────┘
  ~220–240px           flex-1, overflow-y-auto
```

**Sidebar (`AdminSidebar`):**

- Width: `220px` desktop, hidden on mobile (hamburger toggle).
- Background: `surface` (#141417).
- Logo + wordmark at top, `py-6 px-4`.
- Nav items: full text + left icon (`react-icons/fi`), `py-2.5 px-3`, `rounded-md`.
  - Default: `text-muted`, icon `text-faint`.
  - Hover: `bg-surface-2`, `text-text`.
  - Active: `bg-accent`, `text-on-accent`, icon `text-on-accent`. Full bg fill.
- Logout at bottom, `ghost` variant, `text-danger` color, logout icon left.
- No collapse, no tooltip, no mini-mode on desktop.

**Top bar (inside content area, not a separate component):**

- `px-8 py-5`, flex row, space-between.
- Left: "Hi Admin" (`text-sm text-muted`) + page title below (`text-2xl font-display`).
- Right: optional "Create" button (`primary sm`) + Avatar (`size-9`, initials fallback).

**Content area:** `flex-1 overflow-y-auto bg-bg px-8 py-6`.

---

## 4. Typography

Same fonts as client (`DESIGN.md §3`): Space Grotesk (display) + Inter (body).

| Element                 | Style                                                    |
| ----------------------- | -------------------------------------------------------- |
| Page title              | `text-2xl font-display`                                  |
| "Hi Admin" label        | `text-sm text-muted`                                     |
| Section / table heading | `text-sm font-medium text-muted uppercase tracking-wide` |
| Table cell              | `text-sm text-text`                                      |
| Stat card number        | `text-3xl font-display text-text`                        |
| Stat card label         | `text-sm text-muted`                                     |
| Sidebar nav item        | `text-sm font-medium`                                    |

---

## 5. Component inventory (`shared/admin-ui`)

Check this list before creating anything. Add new components here when built.
Components in `shared/ui` are also available — do not duplicate them.

| Component          | Purpose                             | Key props                                              |
| ------------------ | ----------------------------------- | ------------------------------------------------------ |
| `AdminShell`       | sidebar + topbar layout wrapper     | `children`, `pageTitle`, `showCreate`, `onCreateClick` |
| `AdminSidebar`     | left nav with logo + items + logout | `items`, `active`                                      |
| `AdminSidebarItem` | single nav row                      | `icon`, `label`, `href`, `active`                      |
| `StatCard`         | dashboard metric tile               | `label`, `value`, `variant`: default \| accent         |
| `DataTable`        | generic table                       | `columns`, `data`, `onRowClick`                        |
| `DataTableRow`     | single row                          | used inside `DataTable`                                |
| `AdminModal`       | centered overlay dialog             | `open`, `onClose`, `title`, `children`                 |
| `AdminForm`        | form inside modal or page           | `onSubmit`, `children`                                 |
| `ImagePreview`     | cover URL preview (Movies form)     | `src`, `alt`                                           |
| `Checkbox`         | adult content flag etc.             | `checked`, `onChange`, `label`                         |

Reuse from `shared/ui`: `Button`, `Input`, `Logo`, `Avatar`, `Badge`.

> Use `cva` for variants. Use `cn()` from `shared/lib/cn.ts` for class merging.

---

## 6. Component behavior rules

**StatCard**

- `default`: `bg-surface-2`, `rounded-lg`, `p-5`. Label `text-sm text-muted`, value `text-3xl font-display`.
- `accent`: same but `bg-accent`. Label + value both `text-on-accent`.
- Fixed size: consistent height ~120px, let content center vertically.
- No hover effect, no animation. Pure data display.

**DataTable**

- Container: `bg-surface rounded-lg overflow-hidden border border-border`.
- Header row: `bg-surface-2`, `text-sm font-medium text-muted uppercase tracking-wide`, `px-4 py-3`.
- Data row: `border-t border-border`, `px-4 py-3`, hover `bg-surface-2` (CSS only, no Framer).
- Columns: ID (narrow, `text-faint`), then data columns, actions column last (right-aligned).
- Empty state: centered `text-muted text-sm` "No data yet." No illustration needed in admin.

**AdminModal**

- Backdrop: `fixed inset-0 bg-overlay` (`rgba(0,0,0,0.55)`), click-outside closes.
- Panel: `bg-surface rounded-xl p-6`, `max-w-md w-full`, centered with `flex items-center justify-content`.
- `AnimatePresence` + `{ opacity: 0, y: 8 } → { opacity: 1, y: 0 }`, `duration: 0.2, ease: easeOut`. Subtle only.
- Close `×` button top-right: `ghost sm` Button or plain icon button.
- Title: `text-xl font-display mb-4`.

**AdminSidebar active item**

- Active = full `bg-accent rounded-md`, text + icon `text-on-accent`.
- Transition: `color` and `background-color` CSS only, `--dur-fast var(--ease-soft)`. No Framer.

**Create button (top bar)**

- `primary sm` from `Button`. Label: "Create". Right side of top bar.
- Only shown on list pages (Movies, Categories, etc.), not on Dashboard.

---

## 7. Page map (7 admin pages)

| Page       | Route               | Content                                                                               | Has Create btn |
| ---------- | ------------------- | ------------------------------------------------------------------------------------- | -------------- |
| Dashboard  | `/admin`            | StatCard grid (7 metrics)                                                             | No             |
| Movies     | `/admin/movies`     | DataTable (ID, poster, title, overview, category, IMDB) + Create modal with full form | Yes            |
| Categories | `/admin/categories` | DataTable (ID, name) + Create modal (single input)                                    | Yes            |
| Users      | `/admin/users`      | DataTable (user list)                                                                 | No             |
| Comments   | `/admin/comments`   | DataTable (comment list)                                                              | No             |
| Contact us | `/admin/contact`    | DataTable (contact submissions)                                                       | No             |
| Actors     | `/admin/actors`     | DataTable (actor list)                                                                | No             |

**Dashboard stat cards (7 total, from reference):**
`Favorite actions` (default), `Users` (accent), `Movies` (default),
`Comments` (default), `Categories` (default), `Actors` (accent), `Contacts` (default).

**Movies form fields (inside modal or inline panel):**
title, overview (textarea), cover url, trailer (youtube embed url),
watch url, imdb, sub time minutes, category (select/dropdown), adult (checkbox) + Submit button.

---

## 8. What NOT to do (admin-specific)

- Do NOT add hover animations to table rows beyond a CSS `bg` change.
- Do NOT use `MovieCard`, `Rating`, `SectionHeader` — those are client components.
- Do NOT add a hero image or poster-driven layout anywhere in admin.
- Do NOT animate the sidebar.
- Do NOT use `revealContainer/revealItem` stagger on table rows — it looks gimmicky in data UIs.
- Do NOT make the sidebar collapsible unless explicitly asked.
- Do NOT invent new color values — tokens only.

---

## 9. globals.css additions needed

The following tokens are NOT in the current `globals.css` and must be added if used:

```css
/* Admin-specific additions — add to @theme block in globals.css */
--color-table-header-bg: var(--color-surface-2);
--color-table-row-hover: var(--color-surface-2);
--color-sidebar-admin: var(
  --color-surface
); /* same as surface, alias for clarity */
--shadow-modal: 0 24px 60px rgba(0, 0, 0, 0.6);
```

These are thin aliases — they do not add new colors, just semantic names for admin contexts.

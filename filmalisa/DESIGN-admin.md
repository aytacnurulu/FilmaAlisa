# DESIGN-admin.md — Filmalisa Admin Panel Design System

> This file is the single source of truth for the admin panel's visual rules.
> Claude Code must read this before touching any file inside `app/(admin)/`.

---

## 1. Color Palette

The admin panel uses a dark theme exclusively. No light mode.

| Token | Value | Usage |
|---|---|---|
| `bg-base` | `#0f0f0f` | Page background (outermost) |
| `bg-sidebar` | `#141414` | Sidebar background |
| `bg-surface` | `#1a1a1a` | Cards, table rows, modals |
| `bg-surface-hover` | `#222222` | Row hover, nav item hover |
| `border` | `#2a2a2a` | All borders and dividers |
| `text-primary` | `#f0f0f0` | Headings, labels |
| `text-secondary` | `#9a9a9a` | Subtitles, placeholders, muted text |
| `accent` | `#7c3aed` | Active nav item bg, primary buttons, focus rings |
| `accent-hover` | `#6d28d9` | Hover state of accent elements |
| `accent-text` | `#ffffff` | Text on accent background |
| `danger` | `#dc2626` | Delete buttons, destructive actions |
| `danger-hover` | `#b91c1c` | Hover state of danger elements |
| `success` | `#16a34a` | Success toasts, confirm states |

All colors are defined as Tailwind CSS v4 `@theme` tokens in `globals.css`.
Use the token names, never hardcoded hex values in components.

---

## 2. Layout

### Overall Structure

```
┌──────────────────────────────────────────────┐
│  Sidebar (fixed, 200px wide)                 │
│  ┌────────────────────────────────────────┐  │
│  │ Logo                                   │  │
│  │ Nav items                              │  │
│  │                                        │  │
│  │                                        │  │
│  │ Logout (bottom)                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Main area (flex-1, ml-[200px])              │
│  ┌────────────────────────────────────────┐  │
│  │ Header (sticky, 64px tall)             │  │
│  │  "Hi Admin / Page Title"  [Create] 👤 │  │
│  ├────────────────────────────────────────┤  │
│  │ Page content (p-6)                     │  │
│  │  Table / Dashboard cards               │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

- Sidebar: `w-[200px] fixed left-0 top-0 h-screen bg-[#141414] border-r border-[#2a2a2a]`
- Main: `ml-[200px] min-h-screen bg-[#0f0f0f]`
- Header: `sticky top-0 z-40 h-16 bg-[#141414] border-b border-[#2a2a2a] px-6 flex items-center justify-between`
- Content area: `p-6`

---

## 3. Sidebar

### Logo
```
[▷] filmalisa        ← purple triangle icon + lowercase wordmark
```
- Logo area: `h-16 flex items-center px-4 border-b border-[#2a2a2a]`
- Icon: purple (`text-[#7c3aed]`), triangle/play shape via SVG
- Text: `text-white font-semibold text-sm tracking-wide`

### Navigation Items

Nav items in order (from Figma):
1. Dashboard — `LayoutDashboard` icon
2. Movies — `Film` icon (active state shown in screenshot)
3. Categories — `Star` icon (outline)
4. Users — `User` icon
5. Comments — `MessageSquare` icon (or `FileText`)
6. Contact us — `MessageCircle` icon

#### Active State
```
bg-[#7c3aed] text-white rounded-md
```

#### Inactive State
```
text-[#9a9a9a] hover:bg-[#222222] hover:text-white rounded-md transition-colors
```

#### Item Structure
```tsx
<Link href="/admin/movies" className="flex items-center gap-3 px-3 py-2 rounded-md ...">
  <Icon size={18} />
  <span className="text-sm">Movies</span>
</Link>
```

### Logout Button
- Pinned to the bottom of sidebar: `mt-auto`
- Style: `text-[#7c3aed] hover:text-[#6d28d9] flex items-center gap-3 px-3 py-2`
- Icon: `LogOut` (Lucide)

---

## 4. Header

Structure (left → right):
```
[Hi Admin]          [Create Button]   [Avatar + Name]
[Page Title]
```

- Left: greeting + page title stacked vertically
  - Greeting: `text-xs text-[#9a9a9a]` → "Hi Admin"
  - Title: `text-lg font-semibold text-white` → current page name (e.g. "Movies")
- Right: flex row, gap-4
  - Create button (shown only on list pages, not dashboard)
  - Avatar circle + admin name

### Create Button
```tsx
<button className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
  Create
</button>
```

### Avatar
- Circle, 36px diameter
- Shows `img_url` if available, otherwise initials fallback
- Initials background: `bg-[#7c3aed]`
- Adjacent text: admin `full_name` in `text-sm text-white`

---

## 5. Data Tables

### Container
```tsx
<div className="bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] overflow-hidden">
  <table className="w-full">
```

### Header Row
```tsx
<thead>
  <tr className="border-b border-[#2a2a2a]">
    <th className="text-left text-xs font-medium text-[#9a9a9a] uppercase tracking-wider px-4 py-3">
      Title
    </th>
```

### Data Rows
```tsx
<tr className="border-b border-[#2a2a2a] hover:bg-[#222222] transition-colors">
  <td className="px-4 py-3 text-sm text-[#f0f0f0]">...</td>
```

### Columns per resource

**Movies**: ID | Cover (thumbnail 40×56px) | Title | Overview (truncated) | Category | Actions
**Categories**: ID | Name | Created At | Actions
**Actors**: ID | Name | Actions
**Users**: ID | Full Name | Email | Created At
**Comments**: ID | User | Movie | Comment (truncated) | Actions
**Contacts**: ID | Full Name | Email | Reason (truncated) | Created At | Actions

### Actions Column
```tsx
<td className="px-4 py-3">
  <div className="flex items-center gap-2">
    <button onClick={() => openModal('edit', row)} className="...edit styles...">
      <Pencil size={14} />
    </button>
    <button onClick={() => openModal('delete', row)} className="...delete styles...">
      <Trash2 size={14} />
    </button>
  </div>
</td>
```

Action button styles:
- Edit: `p-1.5 rounded text-[#9a9a9a] hover:text-white hover:bg-[#2a2a2a] transition-colors`
- Delete: `p-1.5 rounded text-[#9a9a9a] hover:text-[#dc2626] hover:bg-[#2a2a2a] transition-colors`

---

## 6. Modals

All modals are rendered via the global `ModalProvider` (portalled to `document.body`).
Three modal variants exist:

### A. Create / Edit Modal (form modal)
```
┌─────────────────────────────────┐
│ Create Movie              [✕]   │
├─────────────────────────────────┤
│                                 │
│  [form fields here]             │
│                                 │
├─────────────────────────────────┤
│              [Cancel] [Save]    │
└─────────────────────────────────┘
```

- Overlay: `fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4`
- Panel: `bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl w-full max-w-lg`
- Header: `flex justify-between items-center px-6 py-4 border-b border-[#2a2a2a]`
  - Title: `text-base font-semibold text-white`
  - Close: `text-[#9a9a9a] hover:text-white p-1 rounded`
- Body: `px-6 py-5 space-y-4`
- Footer: `flex justify-end gap-3 px-6 py-4 border-t border-[#2a2a2a]`

### B. Delete Confirm Modal
```
┌─────────────────────────────────┐
│ Delete Movie              [✕]   │
├─────────────────────────────────┤
│                                 │
│  Are you sure you want to       │
│  delete "Movie Title"?          │
│  This action cannot be undone.  │
│                                 │
├─────────────────────────────────┤
│              [Cancel] [Delete]  │
└─────────────────────────────────┘
```

- Same overlay and panel as above, `max-w-sm`
- Delete button: `bg-[#dc2626] hover:bg-[#b91c1c] text-white`

### C. View / Detail Modal (read-only)
Used for viewing Contact messages and Comments in full.
- Same panel, no form — just structured key/value display
- No footer action buttons (only Cancel/Close)

### Form Fields (inside modals)
```tsx
// Label
<label className="block text-xs font-medium text-[#9a9a9a] mb-1.5 uppercase tracking-wide">
  Title
</label>

// Text input
<input className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2
                  text-sm text-[#f0f0f0] placeholder-[#555] focus:outline-none
                  focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-colors" />

// Select
<select className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2
                   text-sm text-[#f0f0f0] focus:outline-none focus:border-[#7c3aed]" />

// Textarea
<textarea className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-md px-3 py-2
                     text-sm text-[#f0f0f0] placeholder-[#555] resize-none h-24
                     focus:outline-none focus:border-[#7c3aed]" />

// Checkbox (for `adult` field)
<input type="checkbox" className="accent-[#7c3aed]" />
```

### Modal Footer Buttons
```tsx
// Cancel
<button className="px-4 py-2 text-sm text-[#9a9a9a] hover:text-white border border-[#2a2a2a]
                   hover:border-[#444] rounded-md transition-colors">
  Cancel
</button>

// Save / Confirm
<button className="px-4 py-2 text-sm font-medium bg-[#7c3aed] hover:bg-[#6d28d9]
                   text-white rounded-md transition-colors disabled:opacity-50">
  Save
</button>
```

---

## 7. Dashboard Cards

```
┌──────────────────┐
│ 🎬               │  ← icon, accent-colored
│ 124              │  ← large number, white
│ Total Movies     │  ← label, muted
└──────────────────┘
```

- Card: `bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6`
- Number: `text-3xl font-bold text-white`
- Label: `text-sm text-[#9a9a9a] mt-1`
- Icon: `text-[#7c3aed]`, 28px

Dashboard stats from API (`GET /admin/dashboard`):
- Total movies
- Total categories
- Total users
- Total comments (if returned)

---

## 8. Typography Rules

- All text: `font-sans` (inherits from globals)
- **No** rounded/playful fonts in admin — clean and utilitarian
- Page titles: `text-lg font-semibold`
- Section headings: `text-sm font-medium text-[#9a9a9a] uppercase tracking-wider`
- Table data: `text-sm`
- Labels: `text-xs font-medium uppercase tracking-wide text-[#9a9a9a]`
- Truncated overview/reason text: `max-w-[240px] truncate`

---

## 9. Animation Rules

Admin panel uses **minimal, functional-only** animation. No decorative motion.

Allowed:
- `transition-colors duration-150` — color changes (hover, active states)
- `transition-opacity duration-200` — modal fade in/out
- Modal backdrop: fade in via `opacity-0 → opacity-100`
- Modal panel: `scale-95 → scale-100` with `opacity-0 → opacity-100` on open

Forbidden in admin:
- Bounce, spring, slide-in sidebar animations
- Any infinite loop animations
- Framer Motion (not needed here — plain CSS transitions only)

---

## 10. Loading & Empty States

### Table loading skeleton
Each row replaced with a shimmer placeholder:
```tsx
<div className="h-4 bg-[#222222] rounded animate-pulse w-3/4" />
```

### Empty state (no data)
```tsx
<div className="text-center py-16 text-[#9a9a9a]">
  <p className="text-sm">No movies found.</p>
</div>
```

### Button loading state
Replace button text with a spinner + "Saving..." and `disabled`:
```tsx
<button disabled className="... disabled:opacity-50 flex items-center gap-2">
  <Loader2 size={14} className="animate-spin" />
  Saving...
</button>
```
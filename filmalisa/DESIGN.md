# Filmalisa — Design System

This file is the **single source of truth** for design rules. Follow it on every UI task.
Goal: a unified, professional look across all 9 client pages that does NOT read as "AI-templated."

> We take **inspiration** from the reference Figma prototype — we do not copy it. Keep the
> visual DNA (dark cinematic background, violet action color, gradient triangle signature,
> vertical sidebar); improve layout and detail with your own judgment.

---

## 1. Non-negotiable rules

1. **No ad-hoc colors.** All color/spacing/radius come only from the tokens in `globals.css`.
   Never write `#xxxxxx` or `bg-[#...]` in a component. Use `bg-surface`, `text-muted`, `rounded-md`.
2. **All buttons come from the `Button` component.** Never style a raw `<button>`.
3. **All inputs come from the `Input` component** (with left-icon + optional right-icon support).
4. **Icons only from `react-icons`** (`react-icons/fi` Feather set is the default — matches the
   thin-line look in the reference). No emoji, no inline SVG.
5. **Check `shared/ui` before creating a new component.** Reuse what exists.
6. **Quality floor:** mobile responsive, keyboard `:focus-visible`, respect
   `prefers-reduced-motion`. These are never announced — they are simply always present.

---

## 2. Visual DNA (keep in mind)

- **Atmosphere:** dark, near-black cinema. Background `bg`, panels `surface`, raised
  surfaces `surface-2`. Do NOT use a light background.
- **Action color:** saturated violet-purple (`accent` = #8b3dff). Use only for real actions
  (primary button, active sidebar icon, link hover). Don't scatter it everywhere — it loses power.
- **Signature:** the blue→purple→pink **gradient triangle logo**. This is the memorable element
  of the page. Use it via `.brand-gradient` / `.brand-text`. Static — no animation.
  Don't paste the gradient onto random surfaces — logo, one accent line, maybe a hero accent. That's it.
- **Content images** (movie posters) bring their own color; the UI chrome must stay quiet so
  the posters can breathe.

---

## 3. Typography

| Role                       | Font              | Used for                                             |
| -------------------------- | ----------------- | ---------------------------------------------------- |
| Display (`--font-display`) | **Space Grotesk** | h1–h3, hero ("Admin"), section titles, logo wordmark |
| Body (`--font-body`)       | **Inter**         | paragraphs, labels, meta, button text, inputs        |

- Next.js: load both with `next/font/google`, bind to CSS variables
  (`--font-display`, `--font-body`), apply on `<body>`.
- Headings use slightly tighter tracking (-0.01em, already in base). Body normal.
- Page title = `text-2xl`, section = `text-xl`, card title = `text-lg`.
- Sentence case by default. ALL-CAPS only for small labels/badges (poster context like
  "LOST IN SPACE" in the reference is an exception).

---

## 4. Layout structure

There are two main templates:

**A. Auth / Landing (NO sidebar):** centered `surface` panel, gradient logo + wordmark at top,
fields stacked vertically, primary button at the bottom. Login, Register, Landing use this.

**B. App shell (WITH sidebar):** a thin vertical **Sidebar** on the left (~64–72px), logo at top,
nav icons below (Home, Movies/Search, Detail, Favorites). Active icon in `accent` color.
A circular **avatar** in the top-right corner. Main content scrolls on the right.
Home, Detail, Favorites, Account, Search use this.

```
App shell (B):
┌──┬───────────────────────────────────┐
│⯁ │  [hero / content]            (S)  │  ⯁ = gradient logo
│  │                                   │  (S) = avatar
│⌂ │  Section ›                        │
│▦ │  ┌────┐┌────┐┌────┐┌────┐         │
│▶ │  │card││card││card││card│  →scroll│
│★ │  └────┘└────┘└────┘└────┘         │
└──┴───────────────────────────────────┘
```

- Page horizontal padding: desktop `px-8/px-10`, mobile `px-4`.
- Gap between sections ~ `--spacing-8`.
- Card rows scroll horizontally (Home/Favorites), grid (Search panel — 4 cols → 2 on mobile).

---

## 5. Component inventory (`shared/ui`)

Before writing a new page, check this list FIRST. If it's missing, create it and **add it here**.

`shared/lib/cn.ts` — `cn()` helper (clsx + tailwind-merge). Import in every component.

| Component       | Status   | Purpose                         | Key props                                                                     |
| --------------- | -------- | ------------------------------- | ----------------------------------------------------------------------------- |
| `Button`        | ✅ built | all actions                     | `variant`: primary \| secondary \| ghost; `size`: sm \| md \| lg; `fullWidth` |
| `Input`         | ✅ built | text fields                     | `leftIcon`, `rightIcon` (eye/toggle), `type`, `error`                         |
| `PasswordInput` | ✅ built | password with eye toggle        | built on `Input`; `leftIcon`, `error`                                         |
| `Logo`          | ✅ built | gradient triangle + wordmark    | `size`: sm \| md \| lg; `withWordmark`                                        |
| `Card`          | ✅ built | container surface               | `as`, `padding`: sm \| md \| lg; `hover`                                      |
| `Badge`         | ✅ built | category label                  | `children` (blue `badge` color)                                               |
| `Rating`        | ✅ built | star rating                     | `value` (1–5), `readOnly`, `onChange`                                         |
| `MovieCard`     | ✅ built | poster + title + rating + badge | `movie`, `onClick`                                                            |
| `Avatar`        | 🔲 todo  | circular profile                | `src`, `fallback`, `size`                                                     |
| `Sidebar`       | 🔲 todo  | app-shell navigation            | `active`, nav items                                                           |
| `SidebarItem`   | 🔲 todo  | single icon link                | `icon`, `href`, `active`                                                      |
| `SectionHeader` | 🔲 todo  | "Action ›" style heading        | `title`, `href`                                                               |
| `Accordion`     | 🔲 todo  | FAQ (Landing)                   | `items`                                                                       |
| `EmptyState`    | 🔲 todo  | 404 / empty list                | `illustration`, `title`, `description`, `action`                              |
| `PageShell`     | 🔲 todo  | sidebar + avatar wrapper        | `children`                                                                    |

> Manage variants with `cva` (class-variance-authority) — it kills duplication and inconsistency.

---

## 6. Component behavior rules

**Button**

- `primary`: `bg-accent text-on-accent`, hover `bg-accent-hover`, active `bg-accent-press`,
  `rounded-md`, `font-medium`. The full-width violet button in the reference = `primary fullWidth`.
- `secondary`: `bg-surface-2 text-text border border-border`, hover `border-strong`.
- `ghost`: transparent, hover `bg-surface-2`.
- Heights: sm 36px, md 44px, lg 52px. Transition `--dur-fast var(--ease-soft)`.

**Input**

- `bg-surface-2`, `border border-border`, `rounded-md`, left icon `text-faint`.
- Focus: `border-accent` + ring (accent-soft). Never fully remove the outline.
- Password: eye icon on the right (`FiEye`/`FiEyeOff`), toggles.
- On `error`: `border-danger` + a small `text-danger` message below.

**MovieCard**

- `rounded-lg`, poster `object-cover`, a bottom-to-top dark gradient overlay so the title is
  readable. Below: `Badge` (category), `Rating`, title (`text-lg`, clamp to 2 lines).
- Hover: subtle lift `y: -4` + shadow `card→pop`. No lift under `motion-reduce`.

**Sidebar / SidebarItem**

- Active item icon `text-accent`, inactive `text-faint`, hover `text-text`.
- Logo at top, items spaced `gap-6` vertically.

**Avatar** — `rounded-pill`, optional gradient ring border (via `brand-gradient` border).

---

## 7. Writing (copy) rules

- Name things in the language users recognize: "Save changes", "Get started", "Watch now".
- An action keeps its name through the flow (button "Register" → toast "Registered").
- Empty/error screens give direction, not mood. 404: what happened + a "Go home" button.
- No filler, sentence case, active voice.

---

## 8. Page map (9 client pages)

| Page         | Template     | Main components                                                        |
| ------------ | ------------ | ---------------------------------------------------------------------- |
| Login        | A            | Logo, Input, PasswordInput, Button                                     |
| Register     | A            | Logo, Input ×2, PasswordInput, Button, link                            |
| Landing      | A (extended) | Logo, hero, feature blocks, Contact form, Accordion (FAQ), footer      |
| Home         | B            | Sidebar, hero, SectionHeader, MovieCard rows, Avatar                   |
| Movie Detail | B            | hero, info panel, Rating, top-cast, comment input, similar (MovieCard) |
| Favorites    | B            | Sidebar, SectionHeader, MovieCard grid                                 |
| Account      | B            | Avatar (gradient ring), Inputs, PasswordInput, Button (save)           |
| Search Panel | B            | search Input, MovieCard grid (4 cols)                                  |
| 404          | B (sidebar)  | EmptyState (illustration, "Lost your way?", "Go home")                 |

---

## 9. Animation (Framer Motion)

Philosophy: **calm, smooth, professional.** Goal — give a living, interactive web feel,
but never look like "AI". Golden rule: _less = more_.

The core motion is a **soft bottom-to-top reveal on scroll** — content emerges as it's read.
Glow breathing, gradient rotation, bounce, spring, infinite loops, replay — **NONE of these**.
Nothing animates forever. The logo is static (gradient yes, animation no).

### 9.1 Tokens (ALWAYS from these)

`shared/motion.ts` is the single source. Aligned with `globals.css`: `--ease-out`, `--dur-base`
(350ms), `--dur-slow` (600ms). Never write random `duration` in components — import from `motion.ts`.

```ts
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const dur = { fast: 0.18, base: 0.35, slow: 0.6 } as const;
```

### 9.2 Scroll reveal — the core effect (Landing and app pages)

Content reveals bottom-to-top + fade as it enters the viewport. `whileInView` + `once: true`.

```tsx
import { revealUp, revealContainer, revealItem } from "@/shared/motion";

// single block
<motion.section variants={revealUp} initial="hidden"
  whileInView="show" viewport={{ once: true, amount: 0.3 }}>

// sequential blocks (info reveals one by one, 80ms step)
<motion.div variants={revealContainer} initial="hidden"
  whileInView="show" viewport={{ once: true, amount: 0.25 }}>
  <motion.h2 variants={revealItem} />
  <motion.p  variants={revealItem} />
  <motion.div variants={revealItem} />  {/* feature block */}
</motion.div>
```

- **Landing:** each section (hero → "Enjoy on your TV" → "Watch everywhere" → kids → contact → FAQ)
  uses its own `revealUp`. Text blocks use `revealContainer/revealItem` to stagger.
- **Home/Favorites/Search:** section titles and card rows reveal as they enter view.
- `amount: 0.25–0.3` — trigger when ¼–⅓ visible. `once: true` — once, no repeat.

### 9.3 Images — subtle in-place motion

Posters and hero images use `imageReveal`: `scale 1.04→1` + fade (dur.slow). This gives a
"settle into place" feel — like a faint parallax, but very small. No fast/large scale.

```tsx
<motion.img
  variants={imageReveal}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.4 }}
/>
```

Optionally a faint scroll-parallax on the hero (`useScroll` + `useTransform`, image moves
~8–12% slower) — but only on the hero, very subtle, nowhere else.

### 9.4 Micro interactions — very subtle

- `MovieCard` hover: `whileHover={{ y: -4 }}` + shadow `card→pop`. No scale/rotation.
- `Button`: only `whileTap={{ scale: 0.98 }}`. No brightness/glow (a CSS hover bg change is enough).
- Sidebar icon: on active, CSS transition `text-faint → text-accent` (`--dur-fast`).
- Input focus: border `accent` + soft ring — pure CSS, no Framer needed.
- Page transition: `pageTransition` (opacity + slight `y`) at the template/layout level.

### 9.5 Hard prohibitions

- **No loops.** No element moves/breathes/pulses forever.
- **No bounce/spring.** Everything is `tween` + `easeOut`. Settles softly, never overshoots.
- No more than 2 animation types running at once on one screen (reveal + hover is enough).
- Magnitude limits: scale changes ≤ 4%, y changes ≤ 24px. No big gestures.
- **`prefers-reduced-motion: reduce`** → check with `useReducedMotion()`, and when true
  disable reveals (opacity only, or static). `globals.css` also handles this at the CSS level.

### 9.6 Integration

- Install `framer-motion`. `shared/motion.ts` is the import source.
- Don't write inline variants in components; import from `motion.ts` so every page shares the rhythm.
- For a JS-free fallback, `globals.css` has `.reveal` / `.reveal-stagger` classes
  (add `is-visible` via IntersectionObserver) — usable instead of Framer for simple blocks.

---

## 10. One risk, one signature (skill principle)

Spend your boldness in one place: the **static gradient triangle logo**. Not animation — the
color itself is the signature. Everything else stays calm, disciplined, dark. Don't paste the
gradient onto every surface; logo, wordmark, maybe one thin accent line — that's it. The liveliness
comes not from animation but from **smooth scroll reveals** (§9). When in doubt, remove one accessory.

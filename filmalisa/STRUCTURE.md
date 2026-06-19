# STRUCTURE.md — Filmalisa File Tree

> Auto-generated from the actual file tree. Do not edit manually.

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
│   │   ├── account/page.tsx
│   │   ├── favorites/page.tsx
│   │   ├── home/page.tsx
│   │   ├── search/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── admin/
│   │   │   ├── actors/
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── categories/
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── comments/route.ts
│   │   │   ├── contacts/
│   │   │   │   ├── [id]/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── dashboard/route.ts
│   │   │   ├── movies/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── comment/[commentId]/route.ts
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── users/route.ts
│   │   ├── auth/
│   │   │   ├── admin-login/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── signup/route.ts
│   │   ├── movie/
│   │   │   └── [id]/
│   │   │       └── favorite/route.ts       ← singular path (toggle favorite)
│   │   ├── movies/
│   │   │   ├── [id]/
│   │   │   │   ├── comment/[commentId]/route.ts
│   │   │   │   ├── comments/route.ts
│   │   │   │   ├── favorite/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── favorites/route.ts
│   │   │   └── route.ts
│   │   ├── categories/route.ts
│   │   ├── contact/route.ts
│   │   └── profile/route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── providers.tsx
├── features/
│   ├── home/
│   │   └── components/
│   │       ├── CategoryRow.tsx
│   │       ├── CategorySection.tsx
│   │       └── HeroSlider.tsx
│   ├── movieDetail/
│   │   └── components/
│   │       ├── CommentSection.tsx
│   │       ├── MetaItem.tsx
│   │       ├── SimilarMovieCard.tsx
│   │       └── SimilarMovies.tsx
│   └── movies/
│       └── components/
│           ├── MovieFilters.tsx
│           └── MovieGrid.tsx
├── lib/
│   ├── api/
│   │   ├── categories.ts
│   │   ├── client.ts
│   │   ├── comment.ts
│   │   ├── contact.ts
│   │   ├── favorite.ts
│   │   ├── index.ts
│   │   ├── movies.ts
│   │   ├── profile.ts
│   │   └── proxy.ts
│   ├── auth/
│   │   └── index.ts
│   ├── types/
│   │   ├── category.ts
│   │   ├── comment.ts
│   │   ├── contact.ts
│   │   ├── movies.ts
│   │   └── profile.ts
│   └── validation/
│       └── index.ts
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
│   │   │   ├── PasswordInput.tsx
│   │   │   └── Rating.tsx
│   │   └── LogoutButton.tsx
│   ├── data/
│   │   └── faq.ts
│   ├── lib/
│   │   └── cn.ts
│   └── motion.ts
├── public/
│   ├── filmalisaBackground.jpg
│   ├── landingpageImg1.svg
│   ├── landingpageImg2.svg
│   └── landingpageImg3.svg
├── .claude/
│   └── settings.local.json
├── .gitignore
├── CLAUDE.md
├── DESIGN.md
├── DESIGN-admin.md
├── README.md
├── STRUCTURE.md
├── eslint.config.mjs
├── middleware.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

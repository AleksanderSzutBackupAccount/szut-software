# Nuxt 4 Rewrite Design

**Date:** 2026-05-07  
**Project:** szut.software-website  
**Goal:** Rewrite the existing React + Vite SPA to Nuxt 4 with SSR for SEO benefits.

---

## Motivation

The current site is a client-side React SPA. Search engines receive an empty HTML shell and must execute JavaScript to see content. Migrating to Nuxt 4 with SSR means crawlers receive fully-rendered HTML on the first request, improving indexability and search rankings without changing the visual design.

---

## Architecture

### Framework

- **Nuxt 4** in SSR mode (default)
- **Vue 3** with `<script setup>` Composition API throughout
- File-based routing via `app/pages/`
- Nuxt auto-imports: all `app/components/` files are globally available, no explicit imports needed in templates

### Directory structure

```
nuxt.config.ts
app/
  app.vue                      ← root: <NuxtLayout><NuxtPage /></NuxtLayout>
  pages/
    index.vue                  ← Home page (Hero + Services + Portfolio)
  layouts/
    default.vue                ← Navbar + SocialBar + <slot /> + Footer
  components/
    Navbar.vue
    SocialBar.vue
    Hero.vue
    Services.vue
    Portfolio.vue
    Footer.vue
    ImageWithFallback.vue      ← simple Vue wrapper (img with onerror fallback)
  assets/
    imports/
      logo.svg
    styles/
      fonts.css
      tailwind.css
      theme.css
public/                        ← static assets served as-is
```

### Routing

Single route: `/` → `pages/index.vue`. If additional pages are added later, create new files in `app/pages/` — no router config required.

---

## Dependencies

### Remove (all React-specific / unused)

- `react`, `react-dom`, `react-router`
- `@vitejs/plugin-react`
- All `@radix-ui/*` packages
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`
- `react-hook-form`, `recharts`, `embla-carousel-react`
- `react-dnd`, `react-dnd-html5-backend`
- `react-day-picker`, `react-slick`, `react-responsive-masonry`
- `react-popper`, `@popperjs/core`
- `vaul`, `cmdk`, `next-themes`, `sonner`
- `canvas-confetti`, `input-otp`, `date-fns`
- `class-variance-authority` (CVA — only needed for shadcn component variants)

### Keep

- `tailwindcss`, `@tailwindcss/vite` — Tailwind v4, same config
- `clsx`, `tailwind-merge` — keep `cn()` utility
- `lucide-vue-next` — replaces `lucide-react` (identical icon set, Vue components)

### Add

- `nuxt` (v4)
- `motion-v` — official Vue port of Motion (Framer Motion); near-identical API

### shadcn-vue

Not pre-installed. Add individual components via the shadcn-vue CLI only when a page actually needs them:
```bash
npx shadcn-vue@latest add button
```

---

## Component mapping

| React (current) | Vue (Nuxt 4) | Notes |
|---|---|---|
| `Layout.tsx` | `layouts/default.vue` | Nuxt layout convention |
| `App.tsx` + `routes.tsx` | `app.vue` + `pages/index.vue` | File-based routing |
| `Home.tsx` | `pages/index.vue` | Composes section components |
| `Hero.tsx` | `Hero.vue` | Direct port |
| `Services.tsx` | `Services.vue` | Direct port |
| `Portfolio.tsx` | `Portfolio.vue` | Direct port; `useRef` → `templateRef` |
| `Navbar.tsx` | `Navbar.vue` | `<Link to="/">` → `<NuxtLink to="/">` |
| `Footer.tsx` | `Footer.vue` | Direct port |
| `SocialBar.tsx` | `SocialBar.vue` | Direct port |
| `figma/ImageWithFallback.tsx` | `ImageWithFallback.vue` | `<img>` with `@error` fallback handler |

---

## Animation porting (motion-v)

`motion-v` mirrors the Framer Motion API for Vue. Most animation code ports mechanically:

| React / motion-react | Vue / motion-v |
|---|---|
| `import { motion } from "motion/react"` | `import { motion } from "motion-v"` |
| `<motion.div animate={...}>` | `<motion.div :animate="{...}">` |
| `<motion.header initial={...}>` | `<motion.header :initial="{...}">` |
| `useScroll({ target: ref })` | `useScroll({ target: ref })` |
| `useTransform(sv, [0,1], [100,-100])` | `useTransform(sv, [0,1], [100,-100])` |
| `whileInView={...}` | `:while-in-view="{...}"` |
| `viewport={{ once: true }}` | `:viewport="{ once: true }"` |
| `useRef<HTMLDivElement>` | `const ref = useTemplateRef('el')` |

The Portfolio scroll-parallax section (`useScroll` + `useTransform` + template ref) maps directly — same composable signatures.

---

## SEO configuration

`pages/index.vue` uses Nuxt's composables for SSR-rendered meta tags:

```ts
useSeoMeta({
  title: 'SZUT.SOFTWARE — Nowoczesny Software House',
  description: 'Tworzymy dedykowane aplikacje webowe i nowoczesne strony WWW. Przekuwamy wizje w cyfrowe rozwiązania, które napędzają wzrost Twojej firmy.',
  ogTitle: 'SZUT.SOFTWARE — Nowoczesny Software House',
  ogDescription: 'Dedykowane aplikacje webowe i nowoczesne strony WWW.',
  ogType: 'website',
})
```

`nuxt.config.ts` sets the default `lang="pl"` and charset globally.

---

## Styling

Tailwind v4 setup is identical to current — `@tailwindcss/vite` plugin in `nuxt.config.ts` under `vite.plugins`. CSS import order in `app/assets/styles/index.css` stays the same: `fonts.css` → `tailwind.css` → `theme.css`. The `@` alias resolves to `app/` in Nuxt 4.

The Figma asset import scheme (`figma:asset/<filename>`) is a custom Vite plugin in the current setup. In the Nuxt 4 rewrite this is dropped — assets are imported directly from `~/assets/imports/logo.svg`.

---

## What is not ported

- All 50+ unused shadcn/ui component files (`src/app/components/ui/`) — dropped entirely
- MUI components — unused, dropped
- The custom Figma asset Vite plugin — replaced by standard asset imports
- `ImageWithFallback` Figma wrapper — replaced with a simple Vue component

---

## Out of scope

- Adding new pages or sections
- Contact form functionality
- CMS integration
- Mobile nav menu (hamburger) — not present in current site

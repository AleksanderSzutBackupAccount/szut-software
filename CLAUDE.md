# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server (Vite)
npm run build  # production build
```

No test runner is configured.

## Architecture

This is a React + Vite single-page app, bootstrapped from a Figma Make export. The entry point is `src/main.tsx` → `src/app/App.tsx` → `src/app/routes.tsx`.

**Routing:** React Router v7 with a single layout route (`Layout`) wrapping a `Home` page. Add new pages in `src/app/pages/` and register them in `routes.tsx`.

**Layout shell:** `Layout.tsx` renders `Navbar` → `SocialBar` → `<Outlet />` → `Footer`. The root background is `#0A0A0A` (near-black), text is white, and the brand accent color is `#fc4445` (red).

**Component layers:**
- `src/app/components/` — page-level sections (Hero, Services, Portfolio, Navbar, Footer, SocialBar)
- `src/app/components/ui/` — shadcn/ui primitives (Radix UI + Tailwind); don't modify these directly
- `src/app/components/figma/` — Figma Make–specific wrappers (e.g. `ImageWithFallback`)

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. CSS custom properties (design tokens) are defined in `src/styles/theme.css` and exposed to Tailwind via `@theme inline`. Import order: `fonts.css` → `tailwind.css` → `theme.css` (via `src/styles/index.css`).

**Aliases:** `@` resolves to `src/`. Figma asset imports use the `figma:asset/<filename>` scheme, resolved to `src/assets/` by a custom Vite plugin.

**Utility:** `cn()` is exported from `src/app/components/ui/utils.ts` — use it for conditional class merging throughout the codebase.

**Key deps:** `motion` (Framer Motion v12), `lucide-react` for icons, MUI (`@mui/material`) alongside shadcn/ui, `react-hook-form`, `recharts`, `sonner` for toasts.

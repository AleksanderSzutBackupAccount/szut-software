# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server (Nuxt)
npm run build  # production build
npm run generate  # static site generation
npm run preview   # preview production build
```

No test runner is configured.

## Architecture

This is a **Nuxt 4 + Vue 3** single-page app. Entry: `app/app.vue` → `app/layouts/default.vue` → `app/pages/index.vue`.

**Routing:** Nuxt file-based routing. Pages go in `app/pages/`, layouts in `app/layouts/`. The default layout (`default.vue`) renders `Navbar` → `SocialBar` → `<slot />` → `Footer`.

**Component layers:**
- `app/components/` — page-level sections: `Hero`, `Services`, `Portfolio`, `Navbar`, `Footer`, `SocialBar`, `ImageWithFallback`

**Styling:** SCSS with BEM methodology. Design tokens and mixins live in `app/assets/styles/`:
- `tokens/` — `_colors.scss`, `_typography.scss`, `_spacing.scss`, `_breakpoints.scss`
- `mixins/` — `_layout.scss` (container), `_responsive.scss` (breakpoint helpers: `sm`, `md`, `lg`, `xl`)
- `_index.scss` — forwards all tokens and mixins; globally injected via `nuxt.config.ts` `additionalData`
- `index.css` — global base styles entry point (imported via `css` in `nuxt.config.ts`)

Tokens are available as SCSS variables everywhere (e.g. `$color-accent`, `$space-4`, `$font-size-lg`). Use `@include lg { }` for breakpoint blocks.

**Design tokens:**
- Background: `$color-bg` (`#0a0a0a`), surface: `$color-surface` (`#1a1a1a`)
- Accent: `$color-accent` (`#fc4445` red)
- Text: `$color-text` (`#ffffff`), muted: `$color-muted` / `$color-muted-light` / `$color-muted-dark`

**Animations:** `motion-v` (Vue port of Motion/Framer Motion). Use `<motion.div>` with `:initial`, `:animate`, `:transition` props.

**Icons:** `lucide-vue-next` — import named icons and use as components.

**Static assets:** `public/` is served at `/`. Favicons are in `public/img/icons/`.

**Deployment:** Vercel (nitro preset). Config in `nuxt.config.ts`.

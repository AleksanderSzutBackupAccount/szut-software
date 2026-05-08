# BEM + SCSS Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Zastąpić Tailwind CSS czystym SCSS z konwencją BEM we wszystkich komponentach Vue.

**Architecture:** Tokeny i mixiny SCSS w globalnym `app/assets/styles/` (injektowane automatycznie przez `nuxt.config.ts`), style komponentów jako `<style lang="scss" scoped>` z blokami BEM. Tailwind i `tw-animate-css` wylatują całkowicie.

**Tech Stack:** Nuxt 4, Vue 3, sass-embedded, motion-v (zostaje), lucide-vue-next (zostaje)

---

## Mapa plików

**Tworzone:**
- `app/assets/styles/tokens/_colors.scss`
- `app/assets/styles/tokens/_typography.scss`
- `app/assets/styles/tokens/_spacing.scss`
- `app/assets/styles/tokens/_breakpoints.scss`
- `app/assets/styles/tokens/_index.scss`
- `app/assets/styles/mixins/_responsive.scss`
- `app/assets/styles/mixins/_layout.scss`
- `app/assets/styles/mixins/_index.scss`
- `app/assets/styles/_index.scss`
- `app/assets/styles/base.scss`

**Modyfikowane:**
- `package.json`
- `nuxt.config.ts`
- `app/assets/styles/index.css`
- `app/layouts/default.vue`
- `app/components/Navbar.vue`
- `app/components/Hero.vue`
- `app/components/Services.vue`
- `app/components/Portfolio.vue`
- `app/components/Footer.vue`
- `app/components/SocialBar.vue`

**Usuwane:**
- `app/assets/styles/tailwind.css`
- `app/assets/styles/theme.css`

---

## Task 1: Setup — swap Tailwind for sass-embedded

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Zainstaluj sass-embedded i usuń Tailwind**

```bash
cd /Users/szut/Projects/szut.software/szut.software-website
npm install --save-dev sass-embedded
npm uninstall @tailwindcss/vite tailwindcss tw-animate-css tailwind-merge clsx
```

- [ ] **Step 2: Zaktualizuj nuxt.config.ts**

Zastąp cały plik:

```ts
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/styles/index.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "${resolve(__dirname, 'app/assets/styles/_index')}" as *;\n`,
        },
      },
    },
  },
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
  },
  routeRules: {
    '/**': { headers: { 'cache-control': 'public, max-age=0, must-revalidate' } },
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
})
```

- [ ] **Step 3: Usuń utils/cn.ts — nie będzie już potrzebny**

```bash
rm app/utils/cn.ts
```

- [ ] **Step 4: Zweryfikuj że nuxt kompiluje się (jeszcze ze starymi Vue files)**

```bash
npm run build 2>&1 | tail -20
```

Oczekiwany wynik: błędy o brakujących klasach Tailwind w `index.css` — to OK, naprawi się w Task 2.

---

## Task 2: SCSS tokens

**Files:**
- Create: `app/assets/styles/tokens/_colors.scss`
- Create: `app/assets/styles/tokens/_typography.scss`
- Create: `app/assets/styles/tokens/_spacing.scss`
- Create: `app/assets/styles/tokens/_breakpoints.scss`
- Create: `app/assets/styles/tokens/_index.scss`

- [ ] **Step 1: Utwórz katalogi**

```bash
mkdir -p app/assets/styles/tokens app/assets/styles/mixins
```

- [ ] **Step 2: Utwórz `app/assets/styles/tokens/_colors.scss`**

```scss
$color-bg:            #0a0a0a;
$color-bg-alt:        #050505;
$color-surface:       #1a1a1a;
$color-accent:        #fc4445;
$color-accent-hover:  #ff5c5d;
$color-text:          #ffffff;
$color-muted:         #9ca3af;
$color-muted-dark:    #6b7280;
$color-border:        rgba(255, 255, 255, 0.05);
$color-border-subtle: rgba(255, 255, 255, 0.1);
```

- [ ] **Step 3: Utwórz `app/assets/styles/tokens/_typography.scss`**

```scss
$font-family-base: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

$font-size-xs:   0.75rem;
$font-size-sm:   0.875rem;
$font-size-base: 1rem;
$font-size-lg:   1.125rem;
$font-size-xl:   1.25rem;
$font-size-2xl:  1.5rem;
$font-size-3xl:  1.875rem;
$font-size-4xl:  2.25rem;
$font-size-5xl:  3rem;
$font-size-6xl:  3.75rem;
$font-size-7xl:  4.5rem;
```

- [ ] **Step 4: Utwórz `app/assets/styles/tokens/_spacing.scss`**

```scss
$space-1:  4px;
$space-2:  8px;
$space-3:  12px;
$space-4:  16px;
$space-5:  20px;
$space-6:  24px;
$space-8:  32px;
$space-10: 40px;
$space-12: 48px;
$space-16: 64px;
$space-20: 80px;
$space-24: 96px;
$space-32: 128px;
$space-40: 160px;
```

- [ ] **Step 5: Utwórz `app/assets/styles/tokens/_breakpoints.scss`**

```scss
$bp-sm:  640px;
$bp-md:  768px;
$bp-lg:  1024px;
$bp-xl:  1280px;
$bp-2xl: 1536px;
```

- [ ] **Step 6: Utwórz `app/assets/styles/tokens/_index.scss`**

```scss
@forward 'colors';
@forward 'typography';
@forward 'spacing';
@forward 'breakpoints';
```

---

## Task 3: SCSS mixins

**Files:**
- Create: `app/assets/styles/mixins/_responsive.scss`
- Create: `app/assets/styles/mixins/_layout.scss`
- Create: `app/assets/styles/mixins/_index.scss`
- Create: `app/assets/styles/_index.scss`

- [ ] **Step 1: Utwórz `app/assets/styles/mixins/_responsive.scss`**

```scss
@use '../tokens/breakpoints' as *;

@mixin sm {
  @media (min-width: #{$bp-sm}) { @content; }
}

@mixin md {
  @media (min-width: #{$bp-md}) { @content; }
}

@mixin lg {
  @media (min-width: #{$bp-lg}) { @content; }
}

@mixin xl {
  @media (min-width: #{$bp-xl}) { @content; }
}
```

- [ ] **Step 2: Utwórz `app/assets/styles/mixins/_layout.scss`**

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 24px;
}

@mixin absolute-fill {
  position: absolute;
  inset: 0;
}
```

- [ ] **Step 3: Utwórz `app/assets/styles/mixins/_index.scss`**

```scss
@forward 'responsive';
@forward 'layout';
```

- [ ] **Step 4: Utwórz główny `app/assets/styles/_index.scss`**

```scss
@forward './tokens/index';
@forward './mixins/index';
```

---

## Task 4: Base styles + aktualizacja index.css

**Files:**
- Create: `app/assets/styles/base.scss`
- Modify: `app/assets/styles/index.css`
- Delete: `app/assets/styles/tailwind.css`
- Delete: `app/assets/styles/theme.css`

- [ ] **Step 1: Utwórz `app/assets/styles/base.scss`**

```scss
@use './tokens/colors' as *;
@use './tokens/typography' as *;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  background-color: $color-bg;
  color: $color-text;
  font-family: $font-family-base;
  line-height: 1.5;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: $color-accent;
  color: $color-text;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

- [ ] **Step 2: Zastąp `app/assets/styles/index.css`**

```css
@import './fonts.css';
@import './base.scss';
```

- [ ] **Step 3: Usuń pliki Tailwind**

```bash
rm app/assets/styles/tailwind.css app/assets/styles/theme.css
```

---

## Task 5: Przepisz default.vue (layout)

**Files:**
- Modify: `app/layouts/default.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<template>
  <div class="layout">
    <Navbar />
    <SocialBar />
    <main class="layout__main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }
}
</style>
```

---

## Task 6: Przepisz Navbar.vue

**Files:**
- Modify: `app/components/Navbar.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { motion } from 'motion-v'
import logoUrl from '~/assets/imports/logo.svg'
</script>

<template>
  <motion.header
    :initial="{ y: -100, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="navbar"
  >
    <div class="navbar__inner">
      <NuxtLink to="/" class="navbar__logo">
        <ImageWithFallback :src="logoUrl" alt="SZUT.SOFTWARE Logo" />
      </NuxtLink>
      <nav class="navbar__nav">
        <a href="#uslugi" class="navbar__link">Usługi</a>
        <a href="#portfolio" class="navbar__link">Portfolio</a>
        <a href="#kontakt" class="navbar__link navbar__link--cta">Kontakt</a>
      </nav>
    </div>
  </motion.header>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid $color-border;

  &__inner {
    @include container;
    @include flex-between;
    height: 80px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: $space-2;

    :deep(img) {
      height: 32px;
      object-fit: contain;
    }
  }

  &__nav {
    display: none;
    align-items: center;
    gap: $space-8;
    font-size: $font-size-sm;
    font-weight: 500;

    @include md {
      display: flex;
    }
  }

  &__link {
    color: $color-muted;
    transition: color 0.2s ease;

    &:hover {
      color: $color-accent;
    }

    &--cta {
      padding: $space-2 + 2px $space-5;
      border-radius: 9999px;
      background-color: $color-accent;
      color: $color-text;
      font-weight: 600;
      box-shadow: 0 0 15px rgba(252, 68, 69, 0.3);
      transition: background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;

      &:hover {
        background-color: $color-accent-hover;
        box-shadow: 0 0 25px rgba(252, 68, 69, 0.5);
        color: $color-text;
      }
    }
  }
}
</style>
```

- [ ] **Step 2: Uruchom dev server i sprawdź navbar**

```bash
npm run dev
```

Otwórz `http://localhost:3000` — navbar ma być przyklejony u góry, logo widoczne, linki działają.

---

## Task 7: Przepisz Hero.vue

**Files:**
- Modify: `app/components/Hero.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowRight, Code } from 'lucide-vue-next'
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <motion.div
        :animate="{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1] }"
        :transition="{ duration: 15, repeat: Infinity, ease: 'linear' }"
        class="hero__bg-orb hero__bg-orb--red"
      />
      <motion.div
        :animate="{ x: [0, -150, 100, 0], y: [0, 150, -50, 0], scale: [1, 1.5, 0.8, 1] }"
        :transition="{ duration: 20, repeat: Infinity, ease: 'linear' }"
        class="hero__bg-orb hero__bg-orb--blue"
      />
      <motion.div
        :animate="{ rotateZ: [0, 360], rotateY: [0, 180, 360], y: [0, -40, 0] }"
        :transition="{ duration: 12, repeat: Infinity, ease: 'linear' }"
        class="hero__bg-shape hero__bg-shape--square"
        :style="{ transformStyle: 'preserve-3d' }"
      />
      <motion.div
        :animate="{ rotateZ: [360, 0], rotateX: [0, 180, 360], y: [0, 50, 0] }"
        :transition="{ duration: 18, repeat: Infinity, ease: 'linear' }"
        class="hero__bg-shape hero__bg-shape--circle"
        :style="{ transformStyle: 'preserve-3d' }"
      />
    </div>

    <div class="hero__content">
      <motion.div
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="hero__badge"
      >
        <Code :size="16" class="hero__badge-icon" />
        <span>Nowoczesny Software House</span>
      </motion.div>

      <motion.h1
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
        class="hero__title"
      >
        Kodujemy Twój biznes <br />
        <span class="hero__title-accent">na nowo</span>
      </motion.h1>

      <motion.p
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
        class="hero__desc"
      >
        Tworzymy dedykowane aplikacje webowe i nowoczesne strony WWW.
        Przekuwamy wizje w cyfrowe rozwiązania, które napędzają wzrost Twojej firmy.
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
        class="hero__actions"
      >
        <a href="#kontakt" class="hero__btn hero__btn--primary">
          <span>Rozpocznij projekt</span>
          <ArrowRight :size="18" class="hero__btn-icon" />
        </a>
        <a href="#portfolio" class="hero__btn hero__btn--outline">
          Nasze portfolio
        </a>
      </motion.div>
    </div>

    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 1.5, duration: 1 }"
      class="hero__scroll"
    >
      <span class="hero__scroll-label">Scroll</span>
      <motion.div
        :animate="{ y: [0, 8, 0] }"
        :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
        class="hero__scroll-line"
      />
    </motion.div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px;

  &__bg {
    @include absolute-fill;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__bg-orb {
    position: absolute;
    border-radius: 9999px;

    &--red {
      width: 400px;
      height: 400px;
      background-color: rgba(252, 68, 69, 0.2);
      filter: blur(100px);
      top: 10%;
      left: 20%;
    }

    &--blue {
      width: 500px;
      height: 500px;
      background-color: rgba(37, 99, 235, 0.1);
      filter: blur(120px);
      bottom: 10%;
      right: 10%;
    }
  }

  &__bg-shape {
    position: absolute;
    backdrop-filter: blur(4px);

    &--square {
      top: 25%;
      right: 20%;
      width: 128px;
      height: 128px;
      border: 1px solid rgba(252, 68, 69, 0.3);
      border-radius: 24px;
    }

    &--circle {
      bottom: 30%;
      left: 15%;
      width: 96px;
      height: 96px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 9999px;
      background-color: rgba(255, 255, 255, 0.05);
    }
  }

  &__content {
    position: relative;
    z-index: 10;
    max-width: 900px;
    margin-inline: auto;
    padding-inline: $space-6;
    text-align: center;
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 $space-4;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid $color-border-subtle;
    font-size: $font-size-sm;
    color: $color-muted;
    margin-bottom: $space-8;
    backdrop-filter: blur(12px);
  }

  &__badge-icon {
    color: $color-accent;
  }

  &__title {
    font-size: $font-size-5xl;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: $color-text;
    margin-bottom: $space-6;
    line-height: 1.1;

    @include md {
      font-size: $font-size-7xl;
    }
  }

  &__title-accent {
    background: linear-gradient(to right, $color-accent, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__desc {
    font-size: $font-size-lg;
    color: $color-muted;
    max-width: 672px;
    margin-inline: auto;
    margin-bottom: $space-10;

    @include md {
      font-size: $font-size-xl;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $space-4;

    @include sm {
      flex-direction: row;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: $space-2;
    padding: $space-4 $space-8;
    border-radius: 9999px;
    font-weight: 600;
    font-size: $font-size-base;
    width: 100%;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
      background-color 0.2s ease, border-color 0.2s ease;
    cursor: pointer;

    @include sm {
      width: auto;
    }

    &--primary {
      background-color: $color-accent;
      color: $color-text;
      border: none;
      box-shadow: 0 0 20px rgba(252, 68, 69, 0.3);
      position: relative;
      overflow: hidden;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 40px rgba(252, 68, 69, 0.5);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    &--outline {
      background-color: transparent;
      color: $color-text;
      border: 1px solid rgba(255, 255, 255, 0.2);

      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.4);
      }
    }
  }

  &__btn-icon {
    transition: transform 0.2s ease;

    .hero__btn--primary:hover & {
      transform: translateX(4px);
    }
  }

  &__scroll {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-2;
  }

  &__scroll-label {
    font-size: $font-size-xs;
    color: $color-muted-dark;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__scroll-line {
    width: 1px;
    height: 48px;
    background: linear-gradient(to bottom, $color-accent, transparent);
  }
}
</style>
```

- [ ] **Step 2: Sprawdź sekcję hero w przeglądarce**

Animowane orby tła, nagłówek z gradientem, dwa przyciski, scroll indicator na dole.

---

## Task 8: Przepisz Services.vue

**Files:**
- Modify: `app/components/Services.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { motion } from 'motion-v'
import { LayoutTemplate, Terminal } from 'lucide-vue-next'

const services = [
  {
    id: 1,
    title: 'Dedykowane aplikacje webowe',
    description: 'Tworzymy zaawansowane systemy B2B, panele CRM/ERP oraz platformy SaaS szyte na miarę Twoich potrzeb biznesowych.',
    icon: Terminal,
    modifier: 'service-card--blue',
  },
  {
    id: 2,
    title: 'Nowoczesne strony WWW',
    description: "Projektujemy i wdrażamy superszybkie, responsywne i zoptymalizowane pod SEO strony wizerunkowe i landing page'e.",
    icon: LayoutTemplate,
    modifier: 'service-card--orange',
  },
]
</script>

<template>
  <section id="uslugi" class="services">
    <div class="services__dot-grid" aria-hidden="true" />

    <div class="services__inner">
      <header class="services__header">
        <motion.h2
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6 }"
          class="services__title"
        >
          Nasze <span class="services__title-accent">Usługi</span>
        </motion.h2>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="services__desc"
        >
          Dostarczamy najwyższej jakości oprogramowanie, które pomaga skalować i automatyzować biznes.
        </motion.p>
      </header>

      <div class="services__grid">
        <motion.div
          v-for="(service, index) in services"
          :key="service.id"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6, delay: index * 0.2 }"
          :class="['service-card', service.modifier]"
        >
          <div class="service-card__glow" aria-hidden="true" />
          <div class="service-card__icon">
            <component :is="service.icon" :size="32" :stroke-width="1.5" />
          </div>
          <h3 class="service-card__title">{{ service.title }}</h3>
          <p class="service-card__body">{{ service.description }}</p>
          <div class="service-card__dots" aria-hidden="true">
            <span class="service-card__dot" />
            <span class="service-card__dot service-card__dot--bright" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.services {
  position: relative;
  padding-block: $space-32;
  padding-inline: $space-6;
  width: 100%;
  background-color: $color-bg;
  overflow: hidden;

  &__dot-grid {
    @include absolute-fill;
    z-index: 0;
    opacity: 0.03;
    background-image: radial-gradient(#fff 1px, transparent 1px);
    background-size: 40px 40px;
  }

  &__inner {
    @include container;
    position: relative;
    z-index: 10;
  }

  &__header {
    margin-bottom: $space-20;
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-4;

    @include md {
      font-size: $font-size-5xl;
    }
  }

  &__title-accent {
    color: $color-accent;
  }

  &__desc {
    color: $color-muted;
    max-width: 672px;
    font-size: $font-size-lg;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-8;

    @include md {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.service-card {
  position: relative;
  padding: $space-10;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  overflow: hidden;
  transition: background-color 0.5s ease, border-color 0.5s ease;
  cursor: default;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  &--blue:hover {
    border-color: rgba(252, 68, 69, 0.5);

    .service-card__glow {
      opacity: 1;
      background: linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(252, 68, 69, 0.2));
    }
  }

  &--orange:hover {
    border-color: rgba(249, 115, 22, 0.5);

    .service-card__glow {
      opacity: 1;
      background: linear-gradient(to bottom right, rgba(252, 68, 69, 0.2), rgba(249, 115, 22, 0.2));
    }
  }

  &:hover .service-card__icon {
    transform: scale(1.1);
    background-color: rgba(252, 68, 69, 0.1);
    border-color: rgba(252, 68, 69, 0.3);

    :deep(svg) {
      color: $color-accent;
    }
  }

  &:hover .service-card__title,
  &:hover .service-card__body {
    transform: translateY(-4px);
  }

  &:hover .service-card__dots {
    opacity: 1;
    transform: translateX(0);
  }

  &__glow {
    @include absolute-fill;
    opacity: 0;
    filter: blur(48px);
    z-index: -1;
    transition: opacity 0.7s ease;
  }

  &__icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: $space-8;
    border: 1px solid $color-border-subtle;
    transition: transform 0.5s ease, background-color 0.5s ease, border-color 0.5s ease;

    :deep(svg) {
      color: $color-text;
      transition: color 0.5s ease;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-4;
    transition: transform 0.5s ease;
  }

  &__body {
    color: $color-muted;
    line-height: 1.7;
    transition: transform 0.5s ease 75ms;
  }

  &__dots {
    position: absolute;
    top: $space-10;
    right: $space-10;
    display: flex;
    gap: $space-2;
    opacity: 0;
    transform: translateX(16px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;
    background-color: rgba(252, 68, 69, 0.5);

    &--bright {
      background-color: $color-accent;
    }
  }
}
</style>
```

- [ ] **Step 2: Sprawdź sekcję usług w przeglądarce**

Dwie karty z ikonami, hover efekt (border + glow), dot-grid tło ledwo widoczne.

---

## Task 9: Przepisz Portfolio.vue

**Files:**
- Modify: `app/components/Portfolio.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import { ExternalLink, ArrowUpRight } from 'lucide-vue-next'

const containerRef = useTemplateRef<HTMLElement>('container')

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
})

const y1        = useTransform(scrollYProgress, [0, 1], [100, -100])
const y2        = useTransform(scrollYProgress, [0, 1], [200, -200])
const opacity   = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
const yBadge    = useTransform(scrollYProgress, [0, 1], [50, -150])
const yPhoneRight = useTransform(scrollYProgress, [0, 1], [-50, 250])
</script>

<template>
  <section id="portfolio" ref="container" class="portfolio">
    <div class="portfolio__glow" aria-hidden="true" />

    <div class="portfolio__inner">

      <!-- Header -->
      <div class="portfolio__header">
        <motion.div :style="{ opacity }">
          <h2 class="portfolio__title">
            Wybrane <span class="portfolio__title-accent">Realizacje</span>
          </h2>
          <p class="portfolio__desc">
            Zobacz projekty, które zrealizowaliśmy z dbałością o detale, wydajność i konwersję.
          </p>
        </motion.div>
        <motion.a
          href="#wiecej"
          :style="{ opacity }"
          class="portfolio__all-link"
        >
          Zobacz wszystkie
          <ArrowUpRight :size="16" class="portfolio__all-link-icon" />
        </motion.a>
      </div>

      <!-- Project: Caredo.pl -->
      <div class="project project--laptop-left">

        <!-- Visual -->
        <div class="project__visual">
          <motion.div :style="{ y: y1 }" class="project__laptop">
            <div class="project__laptop-screen">
              <div class="project__laptop-bar">
                <span class="project__laptop-dot project__laptop-dot--red" />
                <span class="project__laptop-dot project__laptop-dot--yellow" />
                <span class="project__laptop-dot project__laptop-dot--green" />
              </div>
              <div class="project__laptop-window">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBVSXxlbnwxfHx8fDE3NzgxNjA2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Caredo.pl Dashboard"
                  class="project__laptop-img"
                />
                <div class="project__laptop-overlay">
                  <span class="project__laptop-label">Wizualizacja aplikacji</span>
                </div>
              </div>
            </div>
            <div class="project__laptop-base">
              <div class="project__laptop-chin" />
            </div>
          </motion.div>

          <motion.div :style="{ y: yBadge }" class="project__badge">
            <div class="project__badge-icon">
              <span class="project__badge-dot" />
            </div>
            <div>
              <p class="project__badge-label">Wydajność</p>
              <p class="project__badge-value">+ 99.9%</p>
            </div>
          </motion.div>
        </div>

        <!-- Info -->
        <motion.div
          :initial="{ opacity: 0, x: 50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="project__info"
        >
          <div class="project__tag project__tag--red">Aplikacja Webowa</div>
          <h3 class="project__title">Caredo.pl</h3>
          <p class="project__desc">
            Zaawansowana platforma CRM dedykowana dla branży usługowej. System pozwala na kompleksowe zarządzanie klientami, rezerwacjami oraz procesami wewnętrznymi, minimalizując czas obsługi i maksymalizując zyski.
          </p>
          <ul class="project__features">
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Złożony panel analityczny z danymi w czasie rzeczywistym
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Integracja z zewnętrznymi bramkami płatności
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Moduł rezerwacji online oparty na kalendarzach
            </li>
          </ul>
          <a
            href="https://caredo.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="project__link project__link--red"
          >
            Odwiedź stronę
            <ExternalLink :size="16" class="project__link-icon" />
          </a>
        </motion.div>
      </div>

      <!-- Project: 2motion.pl -->
      <div class="project project--phones-right">

        <!-- Info -->
        <motion.div
          :initial="{ opacity: 0, x: -50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="project__info"
        >
          <div class="project__tag project__tag--orange">Strona Wizerunkowa / eCommerce</div>
          <h3 class="project__title">2motion.pl</h3>
          <p class="project__desc">
            Nowoczesna strona WWW z elementami e-commerce, stworzona dla dynamicznie rozwijającej się marki. Oparta na najnowszych technologiach, gwarantuje błyskawiczne ładowanie i doskonałe wrażenia na urządzeniach mobilnych.
          </p>
          <ul class="project__features">
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Niestandardowe animacje 3D (WebGL / Spline)
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Optymalizacja SEO podnosząca widoczność w Google
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Płynne przejścia między podstronami (PWA)
            </li>
          </ul>
          <a
            href="https://2motion.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="project__link project__link--orange"
          >
            Odwiedź stronę
            <ExternalLink :size="16" class="project__link-icon" />
          </a>
        </motion.div>

        <!-- Visual: phones -->
        <div class="project__phones">
          <motion.div :style="{ y: y2 }" class="project__phone project__phone--left">
            <div class="project__phone-notch" />
            <div class="project__phone-screen">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="2motion Mobile view"
                class="project__phone-img"
              />
              <div class="project__phone-overlay" />
            </div>
          </motion.div>

          <motion.div :style="{ y: yPhoneRight }" class="project__phone project__phone--right">
            <div class="project__phone-notch project__phone-notch--wide" />
            <div class="project__phone-screen">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="2motion Mobile view alternate"
                class="project__phone-img project__phone-img--scroll"
              />
              <div class="project__phone-home-bar" />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio {
  position: relative;
  padding-block: $space-32;
  padding-inline: $space-6;
  width: 100%;
  background-color: $color-bg-alt;
  overflow: hidden;

  &__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background-color: rgba(252, 68, 69, 0.05);
    border-radius: 9999px;
    filter: blur(150px);
    pointer-events: none;
  }

  &__inner {
    @include container;
    position: relative;
    z-index: 10;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: $space-24;
    gap: $space-8;

    @include md {
      flex-direction: row;
    }
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-4;

    @include md {
      font-size: $font-size-5xl;
    }
  }

  &__title-accent {
    color: $color-accent;
  }

  &__desc {
    color: $color-muted;
    max-width: 576px;
    font-size: $font-size-lg;
  }

  &__all-link {
    display: flex;
    align-items: center;
    gap: $space-2;
    color: $color-accent;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    border-bottom: 1px solid rgba(252, 68, 69, 0.3);
    padding-bottom: 4px;
    transition: color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: $color-text;
      border-color: $color-text;
    }
  }

  &__all-link-icon {
    transition: transform 0.2s ease;

    .portfolio__all-link:hover & {
      transform: translate(4px, -4px);
    }
  }
}

.project {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-16;
  margin-bottom: $space-40;

  &:last-child {
    margin-bottom: 0;
  }

  @include lg {
    flex-direction: row;
  }

  // Caredo: visual left, info right
  &--laptop-left {
    .project__visual {
      order: 2;

      @include lg {
        order: 1;
        width: 50%;
      }
    }

    .project__info {
      order: 1;

      @include lg {
        order: 2;
        width: 50%;
      }
    }
  }

  // 2motion: info left, phones right
  &--phones-right {
    .project__info {
      @include lg {
        width: 50%;
      }
    }

    .project__phones {
      @include lg {
        width: 50%;
      }
    }
  }

  &__visual {
    position: relative;
    width: 100%;
  }

  // Laptop mockup
  &__laptop {
    position: relative;
    margin-inline: auto;
    width: 100%;
    max-width: 600px;
  }

  &__laptop-screen {
    position: relative;
    padding-top: 62.5%;
    background-color: #1f2937;
    border-radius: 24px 24px 0 0;
    border: 6px solid #111827;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  &__laptop-bar {
    position: absolute;
    inset: 0;
    height: 24px;
    background-color: #111827;
    border-radius: 18px 18px 0 0;
    display: flex;
    align-items: center;
    padding-inline: 12px;
    gap: 6px;
    opacity: 0.8;
    z-index: 10;
  }

  &__laptop-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;

    &--red    { background-color: rgba(239, 68, 68, 0.8); }
    &--yellow { background-color: rgba(234, 179, 8, 0.8); }
    &--green  { background-color: rgba(34, 197, 94, 0.8); }
  }

  &__laptop-window {
    position: absolute;
    inset: 0;
    background-color: #000;
    overflow: hidden;

    &:hover .project__laptop-img {
      opacity: 1;
      transform: scale(1.05);
    }

    &:hover .project__laptop-overlay {
      opacity: 1;
    }
  }

  &__laptop-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    opacity: 0.8;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  &__laptop-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent, transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 24px;
  }

  &__laptop-label {
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 9999px;
    color: $color-text;
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__laptop-base {
    position: relative;
    height: 24px;
    background-color: #374151;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
  }

  &__laptop-chin {
    width: 192px;
    height: 6px;
    background-color: #1f2937;
    border-radius: 0 0 8px 8px;
    opacity: 0.5;
  }

  // Floating badge
  &__badge {
    position: absolute;
    right: -32px;
    bottom: -32px;
    background-color: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(24px);
    border: 1px solid $color-border-subtle;
    padding: $space-4;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    gap: $space-4;

    @include md {
      display: flex;
    }
  }

  &__badge-icon {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background-color: rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__badge-dot {
    width: 16px;
    height: 16px;
    border-radius: 9999px;
    background-color: #3b82f6;
    box-shadow: 0 0 10px #3b82f6;
    display: block;
  }

  &__badge-label {
    color: $color-text;
    font-size: $font-size-sm;
    font-weight: 700;
  }

  &__badge-value {
    color: #4ade80;
    font-size: $font-size-xs;
    font-family: monospace;
  }

  // Phone mockups
  &__phones {
    position: relative;
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  &__phone {
    position: absolute;
    background-color: #111827;
    border-radius: 48px;
    padding: 12px;
    border: 6px solid #1f2937;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
    overflow: hidden;

    &--left {
      width: 200px;
      height: 420px;
      transform: rotate(-6deg);
      z-index: 10;
      margin-left: -192px;
      margin-top: 80px;

      @include sm {
        width: 240px;
        height: 500px;
        margin-left: -224px;
      }

      &:hover .project__phone-img {
        transform: scale(1.1);
      }

      &:hover .project__phone-overlay {
        background-color: transparent;
      }
    }

    &--right {
      width: 220px;
      height: 460px;
      transform: rotate(3deg);
      z-index: 20;
      margin-left: 128px;
      margin-top: -40px;
      transition: transform 0.3s ease;

      @include sm {
        width: 260px;
        height: 540px;
        margin-left: 192px;
      }

      &:hover {
        z-index: 30;
      }

      &:hover .project__phone-img {
        transform: translateY(-40px);
      }
    }
  }

  &__phone-notch {
    position: absolute;
    top: 0;
    inset-x: 0;
    height: 24px;
    background-color: #000;
    border-radius: 48px 48px 0 0;
    display: flex;
    justify-content: center;
    z-index: 20;

    &::after {
      content: '';
      display: block;
      width: 64px;
      height: 16px;
      background-color: #000;
      border-radius: 0 0 12px 12px;
      margin-top: -2px;
    }

    &--wide::after {
      width: 80px;
      height: 20px;
      border-radius: 0 0 16px 16px;
    }
  }

  &__phone-screen {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
    border: 1px solid $color-border-subtle;
  }

  &__phone-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.9;
    transition: transform 0.7s ease;

    &--scroll {
      height: 150%;
      object-position: bottom;
      transition: transform 1s ease;
    }
  }

  &__phone-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.5s ease;
  }

  &__phone-home-bar {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 33%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
  }

  // Info block
  &__info {
    width: 100%;

    @include lg {
      width: 50%;
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: $space-4;
    padding: 4px 12px;
    border-radius: 9999px;

    &--red {
      color: $color-accent;
      background-color: rgba(252, 68, 69, 0.1);
    }

    &--orange {
      color: #f97316;
      background-color: rgba(249, 115, 22, 0.1);
    }
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-6;

    @include sm {
      font-size: $font-size-5xl;
    }
  }

  &__desc {
    color: $color-muted;
    font-size: $font-size-lg;
    line-height: 1.7;
    margin-bottom: $space-8;
  }

  &__features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-bottom: $space-10;
    color: #d1d5db;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__feature-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    flex-shrink: 0;

    &--red    { background-color: $color-accent; }
    &--orange { background-color: #f97316; }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-6;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid $color-border-subtle;
    border-radius: 9999px;
    color: $color-text;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &--red:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(252, 68, 69, 0.5);
    }

    &--orange:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(249, 115, 22, 0.5);
    }
  }

  &__link-icon {
    color: #9ca3af;
    transition: color 0.2s ease;

    .project__link--red:hover & {
      color: $color-accent;
    }

    .project__link--orange:hover & {
      color: #f97316;
    }
  }
}
</style>
```

- [ ] **Step 2: Sprawdź sekcję portfolio w przeglądarce**

Laptop mockup z parallax, floating badge, dwa telefony z parallax, info po bokach.

---

## Task 10: Przepisz Footer.vue

**Files:**
- Modify: `app/components/Footer.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="kontakt" class="footer">
    <div class="footer__contact">
      <div class="footer__heading-group">
        <h3 class="footer__heading">Porozmawiajmy o Twoim projekcie.</h3>
        <p class="footer__sub">Napisz do nas, a my przygotujemy bezpłatną wycenę.</p>
      </div>
      <div class="footer__links">
        <a href="mailto:hello@szut.software" class="footer__link">
          <Mail :size="20" class="footer__link-icon" />
          hello@szut.software
        </a>
        <a href="tel:+48000000000" class="footer__link">
          <Phone :size="20" class="footer__link-icon" />
          +48 000 000 000
        </a>
        <div class="footer__link footer__link--static">
          <MapPin :size="20" class="footer__link-icon" />
          Warszawa, Polska
        </div>
      </div>
    </div>

    <div class="footer__meta">
      <p>&copy; {{ year }} SZUT.SOFTWARE. Wszelkie prawa zastrzeżone.</p>
      <p>SZUT.SOFTWARE SP. Z O.O., KRS 0001234257, NIP 2810109592, REGON 544450532</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  border-top: 1px solid $color-border;
  background-color: $color-bg;
  padding-top: $space-20;
  padding-bottom: $space-10;

  &__contact {
    @include container;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: $space-10;
    margin-bottom: $space-16;

    @include md {
      flex-direction: row;
      align-items: center;
    }
  }

  &__heading {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-2;
  }

  &__sub {
    color: $color-muted;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: #d1d5db;
    font-size: $font-size-lg;
    transition: color 0.2s ease;

    &:not(&--static):hover {
      color: $color-accent;
    }

    &--static {
      color: $color-muted-dark;
      cursor: default;
    }
  }

  &__link-icon {
    color: $color-accent;
    flex-shrink: 0;
  }

  &__meta {
    @include container;
    padding-top: $space-10;
    border-top: 1px solid $color-border-subtle;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: $space-4;
    font-size: $font-size-xs;
    color: $color-muted-dark;
    font-weight: 500;
    letter-spacing: 0.05em;

    @include md {
      flex-direction: row;
    }

    @include lg {
      text-align: left;
    }
  }
}
</style>
```

---

## Task 11: Przepisz SocialBar.vue

**Files:**
- Modify: `app/components/SocialBar.vue`

- [ ] **Step 1: Zastąp cały plik**

```vue
<script setup lang="ts">
import { motion } from 'motion-v'
import { Instagram, Facebook, Linkedin } from 'lucide-vue-next'

const socials = [
  { icon: Instagram, link: '#instagram', label: 'Instagram' },
  { icon: Facebook, link: '#facebook', label: 'Facebook' },
  { icon: Linkedin, link: '#linkedin', label: 'LinkedIn' },
]
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, x: -50 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ delay: 1, duration: 0.8 }"
    class="social-bar"
  >
    <a
      v-for="social in socials"
      :key="social.label"
      :href="social.link"
      :aria-label="social.label"
      class="social-bar__link"
    >
      <component :is="social.icon" :size="22" :stroke-width="1.5" />
    </a>
    <div class="social-bar__line" aria-hidden="true" />
  </motion.div>
</template>

<style lang="scss" scoped>
.social-bar {
  position: fixed;
  left: $space-6;
  bottom: 0;
  z-index: 40;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: $space-6;

  @include lg {
    display: flex;
  }

  &__link {
    color: $color-muted;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: $color-accent;
      transform: translateY(-4px);
    }
  }

  &__line {
    width: 1px;
    height: 96px;
    background: linear-gradient(to top, #374151, transparent);
    margin-top: $space-4;
  }
}
</style>
```

---

## Task 12: Weryfikacja końcowa i build

**Files:** brak zmian w plikach

- [ ] **Step 1: Sprawdź że nie ma śladów Tailwinda w szablonach**

```bash
grep -r "class=\".*\(flex\|grid\|text-\|bg-\|p-\|m-\|w-\|h-\|border\|rounded\|absolute\|relative\|z-\|overflow\|items-\|justify-\)" app/components/ app/layouts/ app/pages/ 2>/dev/null | grep -v "style lang"
```

Oczekiwany wynik: brak — albo tylko klasy BEM (bez kresek Tailwinda jak `text-sm`, `flex-col`).

- [ ] **Step 2: Build produkcyjny**

```bash
npm run build 2>&1
```

Oczekiwany wynik: `✓ Generated public .output/public` bez błędów SCSS.

- [ ] **Step 3: Preview**

```bash
npm run preview
```

Otwórz `http://localhost:3000` i przejdź przez całą stronę:
- Navbar przyklejony, link "Kontakt" z czerwonym tłem
- Hero: animowane orby, tytuł z gradientem, dwa przyciski, scroll indicator
- Services: dwie karty z hover efektem (glow + border)
- Portfolio: laptop z parallax + badge, dwa telefony z parallax
- Footer: dane kontaktowe, stopka
- SocialBar: ikony socials po lewej stronie (tylko desktop)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: replace Tailwind with BEM + SCSS

Remove @tailwindcss/vite, tailwindcss, tw-animate-css, tailwind-merge, clsx.
Add sass-embedded with global token/mixin injection via nuxt.config.ts.
Rewrite all 6 components and layout using BEM naming convention."
```

# Nuxt 4 Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the szut.software marketing site from React + Vite to Nuxt 4 SSR, preserving all visuals and animations.

**Architecture:** Nuxt 4 with `app/` source directory, SSR mode, file-based routing. All section components port 1:1 from `.tsx` to `.vue`. `motion-v` replaces `motion/react` with near-identical API. The existing `src/` directory is kept intact until the dev server confirms everything works, then deleted.

**Tech Stack:** Nuxt 4, Vue 3 (`<script setup>`), Tailwind CSS v4 (`@tailwindcss/vite`), `motion-v`, `lucide-vue-next`, `tw-animate-css`

---

## Files created / modified

| Action | Path | Purpose |
|---|---|---|
| Modify | `package.json` | Replace React deps with Nuxt 4 deps |
| Create | `nuxt.config.ts` | SSR, Tailwind plugin, CSS entry, head defaults |
| Create | `app/app.vue` | Root entry: `<NuxtLayout><NuxtPage />` |
| Create | `app/utils/cn.ts` | `cn()` helper (clsx + tailwind-merge) |
| Create | `app/assets/styles/index.css` | CSS entry: imports fonts, tailwind, theme |
| Create | `app/assets/styles/fonts.css` | Copied from `src/styles/fonts.css` |
| Create | `app/assets/styles/tailwind.css` | Updated source paths for Vue files |
| Create | `app/assets/styles/theme.css` | Copied from `src/styles/theme.css` |
| Copy | `app/assets/imports/logo.svg` | From `src/imports/logo.svg` |
| Create | `app/components/ImageWithFallback.vue` | `<img>` with `@error` fallback |
| Create | `app/layouts/default.vue` | Shell: Navbar + SocialBar + `<slot />` + Footer |
| Create | `app/components/Navbar.vue` | Fixed top nav with motion entrance |
| Create | `app/components/SocialBar.vue` | Fixed left social links |
| Create | `app/components/Hero.vue` | Full-screen hero with animations |
| Create | `app/components/Services.vue` | 2-column service cards |
| Create | `app/components/Portfolio.vue` | Scroll-parallax project showcase |
| Create | `app/components/Footer.vue` | Contact section + legal footer |
| Create | `app/pages/index.vue` | Home page with SEO meta |
| Delete | `src/` | Remove old React source after verification |

---

### Task 1: Replace package.json with Nuxt 4 deps

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Overwrite package.json**

```json
{
  "name": "szut-software-website",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "clsx": "2.1.1",
    "lucide-vue-next": "^0.487.0",
    "motion-v": "^1.0.0",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.3.8"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "nuxt": "^4.0.0",
    "tailwindcss": "4.1.12"
  }
}
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

Expected: installs without errors. `node_modules` contains `nuxt`, `motion-v`, `lucide-vue-next`.

---

### Task 2: Create nuxt.config.ts

**Files:**
- Create: `nuxt.config.ts`

- [ ] **Step 1: Create nuxt.config.ts at project root**

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/styles/index.css'],
  vite: {
    plugins: [tailwindcss()],
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

---

### Task 3: Migrate styles and assets

**Files:**
- Create: `app/assets/styles/fonts.css`
- Create: `app/assets/styles/tailwind.css`
- Create: `app/assets/styles/theme.css`
- Create: `app/assets/styles/index.css`
- Create: `app/assets/imports/logo.svg`

- [ ] **Step 1: Create directories and copy assets**

```bash
mkdir -p app/assets/styles app/assets/imports
cp src/styles/fonts.css app/assets/styles/fonts.css
cp src/styles/theme.css app/assets/styles/theme.css
cp src/imports/logo.svg app/assets/imports/logo.svg
```

- [ ] **Step 2: Create app/assets/styles/tailwind.css**

The original uses React-specific source paths. Replace with Vue paths:

```css
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,vue}';

@import 'tw-animate-css';
```

- [ ] **Step 3: Create app/assets/styles/index.css**

```css
@import './fonts.css';
@import './tailwind.css';
@import './theme.css';
```

---

### Task 4: Create app/app.vue and cn utility

**Files:**
- Create: `app/app.vue`
- Create: `app/utils/cn.ts`

- [ ] **Step 1: Create app/app.vue**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 2: Create app/utils/cn.ts**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

### Task 5: Create ImageWithFallback.vue

**Files:**
- Create: `app/components/ImageWithFallback.vue`

- [ ] **Step 1: Create component**

```vue
<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()

function onError(e: Event) {
  const img = e.target as HTMLImageElement
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23222"/%3E%3C/svg%3E'
}
</script>

<template>
  <img :src="src" :alt="alt" @error="onError" />
</template>
```

Class and other attributes passed by the parent are inherited automatically by the root `<img>` element (Vue 3 default `inheritAttrs: true`).

---

### Task 6: Create default layout

**Files:**
- Create: `app/layouts/default.vue`

- [ ] **Step 1: Create layout**

```vue
<template>
  <div class="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#fc4445] selection:text-white overflow-x-hidden flex flex-col">
    <Navbar />
    <SocialBar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
```

---

### Task 7: Port Navbar.vue

**Files:**
- Create: `app/components/Navbar.vue`

- [ ] **Step 1: Create component**

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
    class="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <NuxtLink to="/" class="flex items-center gap-2">
        <ImageWithFallback :src="logoUrl" alt="SZUT.SOFTWARE Logo" class="h-8 object-contain" />
      </NuxtLink>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#uslugi" class="text-gray-300 hover:text-[#fc4445] transition-colors">Usługi</a>
        <a href="#portfolio" class="text-gray-300 hover:text-[#fc4445] transition-colors">Portfolio</a>
        <a
          href="#kontakt"
          class="px-5 py-2.5 rounded-full bg-[#fc4445] text-white hover:bg-[#ff5c5d] transition-colors font-semibold shadow-[0_0_15px_rgba(252,68,69,0.3)] hover:shadow-[0_0_25px_rgba(252,68,69,0.5)]"
        >
          Kontakt
        </a>
      </nav>
    </div>
  </motion.header>
</template>
```

---

### Task 8: Port SocialBar.vue

**Files:**
- Create: `app/components/SocialBar.vue`

- [ ] **Step 1: Create component**

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
    class="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-6"
  >
    <a
      v-for="(social, idx) in socials"
      :key="idx"
      :href="social.link"
      :aria-label="social.label"
      class="text-gray-400 hover:text-[#fc4445] transition-colors hover:-translate-y-1 transform duration-300"
    >
      <component :is="social.icon" :size="22" :stroke-width="1.5" />
    </a>
    <div class="w-[1px] h-24 bg-gradient-to-t from-gray-800 to-transparent mt-4" />
  </motion.div>
</template>
```

---

### Task 9: Port Hero.vue

**Files:**
- Create: `app/components/Hero.vue`

- [ ] **Step 1: Create component**

```vue
<script setup lang="ts">
import { motion } from 'motion-v'
import { ArrowRight, Code } from 'lucide-vue-next'
</script>

<template>
  <section class="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
      <motion.div
        :animate="{ x: [0, 100, -50, 0], y: [0, -100, 50, 0], scale: [1, 1.2, 0.9, 1] }"
        :transition="{ duration: 15, repeat: Infinity, ease: 'linear' }"
        class="absolute w-[400px] h-[400px] rounded-full bg-[#fc4445]/20 blur-[100px] top-[10%] left-[20%]"
      />
      <motion.div
        :animate="{ x: [0, -150, 100, 0], y: [0, 150, -50, 0], scale: [1, 1.5, 0.8, 1] }"
        :transition="{ duration: 20, repeat: Infinity, ease: 'linear' }"
        class="absolute w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] bottom-[10%] right-[10%]"
      />
      <motion.div
        :animate="{ rotateZ: [0, 360], rotateY: [0, 180, 360], y: [0, -40, 0] }"
        :transition="{ duration: 12, repeat: Infinity, ease: 'linear' }"
        class="absolute top-[25%] right-[20%] w-32 h-32 border border-[#fc4445]/30 rounded-3xl backdrop-blur-sm"
        :style="{ transformStyle: 'preserve-3d' }"
      />
      <motion.div
        :animate="{ rotateZ: [360, 0], rotateX: [0, 180, 360], y: [0, 50, 0] }"
        :transition="{ duration: 18, repeat: Infinity, ease: 'linear' }"
        class="absolute bottom-[30%] left-[15%] w-24 h-24 border border-white/10 rounded-full backdrop-blur-md bg-white/5"
        :style="{ transformStyle: 'preserve-3d' }"
      />
    </div>

    <div class="relative z-10 max-w-5xl mx-auto px-6 text-center">
      <motion.div
        :initial="{ opacity: 0, scale: 0.9 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.8, ease: 'easeOut' }"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8 backdrop-blur-md"
      >
        <Code :size="16" class="text-[#fc4445]" />
        <span>Nowoczesny Software House</span>
      </motion.div>

      <motion.h1
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
        class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
      >
        Kodujemy Twój biznes <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#fc4445] to-orange-500">
          na nowo
        </span>
      </motion.h1>

      <motion.p
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.4, ease: 'easeOut' }"
        class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
      >
        Tworzymy dedykowane aplikacje webowe i nowoczesne strony WWW.
        Przekuwamy wizje w cyfrowe rozwiązania, które napędzają wzrost Twojej firmy.
      </motion.p>

      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.6, ease: 'easeOut' }"
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="#kontakt"
          class="group relative inline-flex items-center gap-2 px-8 py-4 bg-[#fc4445] text-white rounded-full font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(252,68,69,0.3)] hover:shadow-[0_0_40px_rgba(252,68,69,0.5)] w-full sm:w-auto justify-center"
        >
          <span class="relative z-10">Rozpocznij projekt</span>
          <ArrowRight :size="18" class="relative z-10 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#portfolio"
          class="group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all hover:border-white/40 w-full sm:w-auto justify-center"
        >
          Nasze portfolio
        </a>
      </motion.div>
    </div>

    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 1.5, duration: 1 }"
      class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span class="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
      <motion.div
        :animate="{ y: [0, 8, 0] }"
        :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
        class="w-[1px] h-12 bg-gradient-to-b from-[#fc4445] to-transparent"
      />
    </motion.div>
  </section>
</template>
```

---

### Task 10: Port Services.vue

**Files:**
- Create: `app/components/Services.vue`

- [ ] **Step 1: Create component**

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
    color: 'from-blue-500/20 to-[#fc4445]/20',
    border: 'group-hover:border-[#fc4445]/50',
  },
  {
    id: 2,
    title: 'Nowoczesne strony WWW',
    description: "Projektujemy i wdrażamy superszybkie, responsywne i zoptymalizowane pod SEO strony wizerunkowe i landing page'e.",
    icon: LayoutTemplate,
    color: 'from-[#fc4445]/20 to-orange-500/20',
    border: 'group-hover:border-orange-500/50',
  },
]
</script>

<template>
  <section id="uslugi" class="relative py-32 px-6 w-full bg-[#0A0A0A] overflow-hidden">
    <div
      class="absolute inset-0 z-0 opacity-[0.03]"
      :style="{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }"
    />

    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="mb-20">
        <motion.h2
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6 }"
          class="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Nasze <span class="text-[#fc4445]">Usługi</span>
        </motion.h2>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6, delay: 0.2 }"
          class="text-gray-400 max-w-2xl text-lg"
        >
          Dostarczamy najwyższej jakości oprogramowanie, które pomaga skalować i automatyzować biznes.
        </motion.p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          v-for="(service, index) in services"
          :key="service.id"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.6, delay: index * 0.2 }"
          :class="['group relative p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:bg-white/[0.04] cursor-default', service.border]"
        >
          <div :class="['absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br transition-opacity duration-700 blur-3xl -z-10', service.color]" />

          <div class="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform duration-500 group-hover:bg-[#fc4445]/10 group-hover:border-[#fc4445]/30">
            <component :is="service.icon" class="text-white group-hover:text-[#fc4445] transition-colors duration-500" :size="32" :stroke-width="1.5" />
          </div>

          <h3 class="text-2xl font-bold text-white mb-4 group-hover:-translate-y-1 transition-transform duration-500">
            {{ service.title }}
          </h3>

          <p class="text-gray-400 leading-relaxed group-hover:-translate-y-1 transition-transform duration-500 delay-75">
            {{ service.description }}
          </p>

          <div class="absolute top-10 right-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-4 group-hover:translate-x-0">
            <span class="w-2 h-2 rounded-full bg-[#fc4445]/50" />
            <span class="w-2 h-2 rounded-full bg-[#fc4445]" />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
</template>
```

---

### Task 11: Port Portfolio.vue

**Files:**
- Create: `app/components/Portfolio.vue`

The React version called `useTransform` inline inside JSX (`style={{ y: useTransform(...) }}`). Vue doesn't allow composable calls inside templates — all transforms are defined upfront in `<script setup>`.

- [ ] **Step 1: Create component**

```vue
<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import { ExternalLink, ArrowUpRight } from 'lucide-vue-next'

const containerRef = useTemplateRef<HTMLElement>('container')

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
})

const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
const y2 = useTransform(scrollYProgress, [0, 1], [200, -200])
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
const yBadge = useTransform(scrollYProgress, [0, 1], [50, -150])
const yPhoneRight = useTransform(scrollYProgress, [0, 1], [-50, 250])
</script>

<template>
  <section id="portfolio" ref="container" class="relative py-32 px-6 w-full bg-[#050505] overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fc4445]/5 rounded-full blur-[150px] pointer-events-none" />

    <div class="relative z-10 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
        <motion.div :style="{ opacity }">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Wybrane <span class="text-[#fc4445]">Realizacje</span>
          </h2>
          <p class="text-gray-400 max-w-xl text-lg">
            Zobacz projekty, które zrealizowaliśmy z dbałością o detale, wydajność i konwersję.
          </p>
        </motion.div>
        <motion.a
          href="#wiecej"
          :style="{ opacity }"
          class="flex items-center gap-2 text-[#fc4445] hover:text-white transition-colors group text-sm uppercase tracking-wider font-semibold border-b border-[#fc4445]/30 hover:border-white pb-1"
        >
          Zobacz wszystkie
          <ArrowUpRight :size="16" class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.a>
      </div>

      <!-- Caredo.pl Project - Laptop Mockup -->
      <div class="flex flex-col lg:flex-row items-center gap-16 mb-40">
        <div class="lg:w-1/2 order-2 lg:order-1 relative">
          <motion.div :style="{ y: y1 }" class="relative mx-auto w-full max-w-[600px]">
            <div class="relative pt-[62.5%] bg-gray-800 rounded-t-3xl border-[6px] border-gray-900 shadow-2xl overflow-hidden shadow-black/50">
              <div class="absolute inset-0 bg-[#1A1A1A] p-1 flex flex-col">
                <div class="w-full h-4 sm:h-6 bg-gray-900 rounded-t-lg flex items-center px-3 gap-1.5 opacity-80">
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/80" />
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/80" />
                  <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/80" />
                </div>
                <div class="flex-1 w-full bg-black relative overflow-hidden group">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBVSXxlbnwxfHx8fDE3NzgxNjA2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Caredo.pl Dashboard"
                    class="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-semibold uppercase tracking-widest">Wizualizacja aplikacji</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative h-4 sm:h-6 bg-gray-700 rounded-b-xl sm:rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex justify-center">
              <div class="w-32 sm:w-48 h-1 sm:h-1.5 bg-gray-800 rounded-b-lg opacity-50" />
            </div>
          </motion.div>

          <motion.div
            :style="{ y: yBadge }"
            class="absolute -right-8 -bottom-8 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl hidden md:block"
          >
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span class="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
              </div>
              <div>
                <p class="text-white text-sm font-bold">Wydajność</p>
                <p class="text-green-400 text-xs font-mono">+ 99.9%</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          :initial="{ opacity: 0, x: 50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="lg:w-1/2 order-1 lg:order-2"
        >
          <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#fc4445] mb-4 bg-[#fc4445]/10 px-3 py-1 rounded-full">
            <span>Aplikacja Webowa</span>
          </div>
          <h3 class="text-4xl sm:text-5xl font-bold text-white mb-6">Caredo.pl</h3>
          <p class="text-gray-400 text-lg leading-relaxed mb-8">
            Zaawansowana platforma CRM dedykowana dla branży usługowej. System pozwala na kompleksowe zarządzanie klientami, rezerwacjami oraz procesami wewnętrznymi, minimalizując czas obsługi i maksymalizując zyski.
          </p>
          <ul class="space-y-4 mb-10 text-gray-300">
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-[#fc4445]" />
              Złożony panel analityczny z danymi w czasie rzeczywistym
            </li>
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-[#fc4445]" />
              Integracja z zewnętrznymi bramkami płatności
            </li>
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-[#fc4445]" />
              Moduł rezerwacji online oparty na kalendarzach
            </li>
          </ul>
          <a href="https://caredo.pl" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:border-[#fc4445]/50 group">
            Odwiedź stronę <ExternalLink :size="16" class="text-gray-400 group-hover:text-[#fc4445] transition-colors" />
          </a>
        </motion.div>
      </div>

      <!-- 2motion.pl Project - Smartphone Mockups -->
      <div class="flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          :initial="{ opacity: 0, x: -50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="lg:w-1/2"
        >
          <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4 bg-orange-500/10 px-3 py-1 rounded-full">
            <span>Strona Wizerunkowa / eCommerce</span>
          </div>
          <h3 class="text-4xl sm:text-5xl font-bold text-white mb-6">2motion.pl</h3>
          <p class="text-gray-400 text-lg leading-relaxed mb-8">
            Nowoczesna strona WWW z elementami e-commerce, stworzona dla dynamicznie rozwijającej się marki. Oparta na najnowszych technologiach, gwarantuje błyskawiczne ładowanie i doskonałe wrażenia na urządzeniach mobilnych.
          </p>
          <ul class="space-y-4 mb-10 text-gray-300">
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Niestandardowe animacje 3D (WebGL / Spline)
            </li>
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Optymalizacja SEO podnosząca widoczność w Google
            </li>
            <li class="flex items-center gap-3">
              <div class="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Płynne przejścia między podstronami (PWA)
            </li>
          </ul>
          <a href="https://2motion.pl" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white transition-all hover:border-orange-500/50 group">
            Odwiedź stronę <ExternalLink :size="16" class="text-gray-400 group-hover:text-orange-500 transition-colors" />
          </a>
        </motion.div>

        <div class="lg:w-1/2 relative h-[600px] w-full flex justify-center items-center perspective-1000">
          <motion.div :style="{ y: y2 }" class="absolute z-10 -ml-32 md:-ml-48 mt-20">
            <div class="relative w-[200px] sm:w-[240px] h-[420px] sm:h-[500px] bg-gray-900 rounded-[3rem] p-3 border-[4px] sm:border-[6px] border-gray-800 shadow-2xl overflow-hidden -rotate-6 group">
              <div class="absolute top-0 inset-x-0 h-6 bg-black rounded-t-3xl flex justify-center z-20">
                <div class="w-16 h-4 bg-black rounded-b-xl mt-[-2px]" />
              </div>
              <div class="w-full h-full bg-black rounded-[2rem] overflow-hidden relative border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="2motion Mobile view"
                  class="w-full h-full object-cover object-center opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </motion.div>

          <motion.div :style="{ y: yPhoneRight }" class="absolute z-20 ml-32 md:ml-48 -mt-10">
            <div class="relative w-[220px] sm:w-[260px] h-[460px] sm:h-[540px] bg-gray-900 rounded-[3.5rem] p-3 border-[4px] sm:border-[6px] border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden rotate-3 group hover:z-30 transition-transform">
              <div class="absolute top-0 inset-x-0 h-6 bg-black rounded-t-3xl flex justify-center z-20">
                <div class="w-20 h-5 bg-black rounded-b-2xl mt-[-2px]" />
              </div>
              <div class="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="2motion Mobile view alternate"
                  class="w-full h-[150%] object-cover object-bottom opacity-90 group-hover:-translate-y-10 transition-transform duration-1000 ease-out"
                />
                <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
</template>
```

---

### Task 12: Port Footer.vue

**Files:**
- Create: `app/components/Footer.vue`

- [ ] **Step 1: Create component**

```vue
<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="kontakt" class="w-full border-t border-white/5 bg-[#0A0A0A] pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
      <div>
        <h3 class="text-3xl font-bold text-white mb-2">Porozmawiajmy o Twoim projekcie.</h3>
        <p class="text-gray-400">Napisz do nas, a my przygotujemy bezpłatną wycenę.</p>
      </div>
      <div class="flex flex-col gap-4">
        <a href="mailto:hello@szut.software" class="flex items-center gap-3 text-gray-300 hover:text-[#fc4445] transition-colors text-lg">
          <Mail :size="20" class="text-[#fc4445]" />
          hello@szut.software
        </a>
        <a href="tel:+48000000000" class="flex items-center gap-3 text-gray-300 hover:text-[#fc4445] transition-colors text-lg">
          <Phone :size="20" class="text-[#fc4445]" />
          +48 000 000 000
        </a>
        <div class="flex items-center gap-3 text-gray-400 text-lg">
          <MapPin :size="20" class="text-[#fc4445]" />
          Warszawa, Polska
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 text-center lg:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium tracking-wide">
      <p>&copy; {{ year }} SZUT.SOFTWARE. Wszelkie prawa zastrzeżone.</p>
      <p>SZUT.SOFTWARE SP. Z O.O., KRS 0001234257, NIP 2810109592, REGON 544450532</p>
    </div>
  </footer>
</template>
```

---

### Task 13: Create pages/index.vue

**Files:**
- Create: `app/pages/index.vue`

- [ ] **Step 1: Create page**

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'SZUT.SOFTWARE — Nowoczesny Software House',
  description: 'Tworzymy dedykowane aplikacje webowe i nowoczesne strony WWW. Przekuwamy wizje w cyfrowe rozwiązania, które napędzają wzrost Twojej firmy.',
  ogTitle: 'SZUT.SOFTWARE — Nowoczesny Software House',
  ogDescription: 'Dedykowane aplikacje webowe i nowoczesne strony WWW dla firm, które chcą rosnąć.',
  ogType: 'website',
})
</script>

<template>
  <div class="w-full">
    <Hero />
    <Services />
    <Portfolio />
  </div>
</template>
```

---

### Task 14: Verify dev server

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected: Nuxt dev server starts on `http://localhost:3000` with no build errors.

- [ ] **Step 2: Visual check**

Open `http://localhost:3000`. Verify:
- Dark background (`#0A0A0A`) renders immediately (not blank)
- Navbar is fixed and visible with logo
- Hero animations play on load
- Services section animates in on scroll
- Portfolio parallax effects work
- Footer shows contact info
- No console errors

- [ ] **Step 3: Confirm SSR output**

```bash
curl -s http://localhost:3000 | grep -c "Kodujemy"
```

Expected: `1` — the hero heading is present in the raw HTML response, confirming SSR (not client-side rendered).

---

### Task 15: Delete old React source

Only run this after Task 14 confirms the site works.

- [ ] **Step 1: Remove src/**

```bash
rm -rf src/
```

- [ ] **Step 2: Verify production build**

```bash
npm run build
```

Expected: build completes. Output written to `.output/`.

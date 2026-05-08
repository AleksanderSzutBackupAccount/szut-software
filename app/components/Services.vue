<script setup lang="ts">
import { motion } from 'motion-v'
import { LayoutTemplate, Terminal } from 'lucide-vue-next'

const services = [
  {
    id: 1,
    title: 'Dedykowane aplikacje webowe',
    description: 'Tworzymy zaawansowane systemy B2B, panele CRM/ERP oraz platformy SaaS szyte na miarę Twoich potrzeb biznesowych.',
    icon: Terminal,
    isBlue: true,
    isOrange: false,
  },
  {
    id: 2,
    title: 'Nowoczesne strony WWW',
    description: "Projektujemy i wdrażamy superszybkie, responsywne i zoptymalizowane pod SEO strony wizerunkowe i landing page'e.",
    icon: LayoutTemplate,
    isBlue: false,
    isOrange: true,
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
          :class="['service-card', { 'service-card--blue': service.isBlue, 'service-card--orange': service.isOrange }]"
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

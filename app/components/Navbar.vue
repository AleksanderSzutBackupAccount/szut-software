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
      padding: calc(#{$space-2} + 2px) $space-5;
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

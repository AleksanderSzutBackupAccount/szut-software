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

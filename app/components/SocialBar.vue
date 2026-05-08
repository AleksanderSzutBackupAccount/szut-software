<script setup lang="ts">
import { motion } from 'motion-v'
import { Instagram, Facebook, Linkedin } from 'lucide-vue-next'

const socials = [
  { icon: Instagram, link: 'https://www.instagram.com/szut_software/', label: 'Instagram' },
  { icon: Facebook, link: 'https://www.facebook.com/szutsoftware/', label: 'Facebook' },
  { icon: Linkedin, link: 'https://www.linkedin.com/company/szut-software', label: 'LinkedIn' },
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
      target="_blank"
      rel="noopener noreferrer"
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
    background: linear-gradient(to top, $color-surface, transparent);
    margin-top: $space-4;
  }
}
</style>

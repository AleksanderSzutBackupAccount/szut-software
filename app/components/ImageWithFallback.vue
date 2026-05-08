<script setup lang="ts">
defineProps<{
  src: string
  alt: string
}>()

function onError(e: Event) {
  const img = e.target as HTMLImageElement
  img.onerror = null
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23222"/%3E%3C/svg%3E'
}
</script>

<template>
  <img :src="src" :alt="alt" @error="onError" />
</template>

<script setup lang="ts">
    import { BreakPointsComposable } from "@/composable/BreakPointsComposable";
    import Particles from "@/components/Particles.vue";
    import MainHeaderDesktop from "@/modules/main/Layouts/Header/Desktop/MainHeaderDesktop.vue";
    import MainHeaderMobile from "@/modules/main/Layouts/Header/Mobile/MainHeaderMobile.vue";

    const { desktop } = BreakPointsComposable();
</script>

<template>
    <main-header-desktop v-if="desktop" />
    <main-header-mobile v-else />
    <router-view />
    <Particles />
    <Particles shape-type-string="circle" />
</template>

<style scoped lang="scss"></style>

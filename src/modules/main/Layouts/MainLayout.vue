<script setup lang="ts">
    import Particles from "@/components/Particles.vue";
    import MainHeader from "@/modules/main/Layouts/Header/TheMainHeader.vue";
</script>

<template>
    <main-header />
    <router-view />
    <Particles />
    <Particles shape-type-string="circle" />
</template>

<style scoped lang="scss"></style>

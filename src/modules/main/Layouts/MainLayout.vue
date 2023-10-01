<script setup lang="ts">
    import Particles from "@/components/Particles.vue";
    import MainHeader from "@/modules/main/Layouts/Header/TheMainHeader.vue";
    import TheMainModal from "@/modules/main/Layouts/Modal/TheMainModal.vue";
</script>

<template>
    <main-header />
    <router-view />
    <the-main-modal />
    <Particles />
    <Particles shape-type-string="circle" />
</template>

<style scoped lang="scss"></style>

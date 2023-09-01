<template class="app">
    <app-header />
    <router-view />
    <template v-if="false">
        <ParticlesJS />
        <ParticlesJS shape-type-string="circle" />
    </template>
</template>

<style lang="scss">
    #app {
        font-family: "Open Sans", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
    }
</style>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ParticlesJS from "@/layout/ParticlesJS.vue";

export default {
        components: { ParticlesJS, AppHeader },
    };
</script>

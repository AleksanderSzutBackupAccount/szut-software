<template class="app">
    <app-header />
    <router-view />
    <Particles />
    <Particles shape-type-string="circle" />
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
    import Particles from "@/components/Particles.vue";

    export default {
        components: { Particles, AppHeader },
    };
</script>

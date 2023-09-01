<template class="app">
    <app-header />
    <router-view />
    <ParticlesJS />
    <ParticlesJS shape-type-string="circle" />
</template>

<style lang="scss">
    #app {
        font-family: "Open Sans", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: 20px;
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

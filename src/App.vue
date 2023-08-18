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
    color: #111;
}
</style>
<script>
import AppHeader from "@/components/AppHeader.vue";
import ParticlesJS from "@/components/ParticlesJS.vue";

export default {
    components: { ParticlesJS, AppHeader },
};
</script>

<template class="app">
  <app-header />
  <router-view />
  <particles-j-s class="app__particles" />
  <particles-j-s class="app__particles" shape-type-string="circle" />
</template>

<style lang="scss">
.app {
  &__particles {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
}
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
import AppHeader from "@/components/AppHeader";
import ParticlesJS from "@/components/ParticlesJS";
export default {
  components: { ParticlesJS, AppHeader },
};
</script>

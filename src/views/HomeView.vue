<template>
    <div class="home-view" id="particles-js">
        <hero-section />
        <contact-section />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HeroSection from "@/components/HeroSection.vue";
import ContactSection from "@/components/ContactSection.vue";

@Options({
    components: { HeroSection, ContactSection },
})
export default class HomeView extends Vue {}
</script>
<style lang="scss">
.home-view {
}
</style>

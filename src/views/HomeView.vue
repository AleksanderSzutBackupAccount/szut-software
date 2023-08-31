<template>
    <div class="home-view" id="particles-js">
        <the-hero />
        <contact-section />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ContactSection from "@/components/ContactSection.vue";
import TheHero from "@/components/TheHero/TheHero.vue";

@Options({
    components: { TheHero, ContactSection },
})
export default class HomeView extends Vue {}
</script>
<style lang="scss">
.home-view {
}
</style>

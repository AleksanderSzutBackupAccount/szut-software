<template>
  <section class="hero-section">
    <the-header class="hero-section__header" />
    <hero-section-animate-image class="hero-section__image" />
  </section>
</template>

<script>
import TheHeader from "./TheHeader";
import HeroSectionAnimateImage from "@/components/animate/HeroSectionAnimateImage";

export default {
  name: "HeroSection",
  components: { HeroSectionAnimateImage, TheHeader },
};
</script>

<style lang="scss" scoped>
.hero-section {
  max-width: 1024px;
  display: flex;
  margin: 0 auto 20px auto;
  justify-content: center;
  flex-wrap: wrap;
  &__image {
    max-width: 400px;
    width: 90%;
    min-width: 200px;
  }

  @media (min-width: 720px) {
    margin: 80px auto;
    justify-content: space-between;
    flex-wrap: nowrap;
    &__image {
      margin-left: 30px;
    }
  }
}
</style>

<template>
  <header class="app-header">
    <router-link :to="{ name: 'Home' }">
      <img
        src="@/assets/logo.svg"
        alt="Szut software logo"
        class="app-header__logo"
      />
    </router-link>
    <app-social-links class="app-header__social-links" />
  </header>
</template>

<script>
import AppSocialLinks from "@/components/AppSocialLinks";
export default {
  name: "AppHeader",
  components: { AppSocialLinks },
};
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1300px;
  width: 100%;
  padding: 50px 0;
  &__logo {
    width: 30vw;
    min-width: 120px;
    max-width: 180px;
  }
  &__social-links {
  }
}
</style>

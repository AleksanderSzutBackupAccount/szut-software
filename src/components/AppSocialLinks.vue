<template>
  <div class="app-social-links">
    <a href="" class="app-social-links__link app-social-links__link--fb">
      <img src="@/assets/facebook.svg" alt="Go to our facebook" />
    </a>
    <a href="" class="app-social-links__link app-social-links__link--fb">
      <img src="@/assets/whatsapp.svg" alt="Go to our whatsapp" />
    </a>
    <a href="" class="app-social-links__link app-social-links__link--fb">
      <img src="@/assets/instagram-sketched.svg" alt="Go to our instagram" />
    </a>
  </div>
</template>

<script>
export default {
  name: "AppSocialLinks",
};
</script>

<style lang="scss" scoped>
.app-social-links {
  display: grid;
  grid-column-gap: 32px;
  grid-row-gap: 16px;
  justify-items: center;

  @media (min-width: 420px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &__link {
    padding: 5px;
    img {
      max-height: 35px;
    }
  }
}
</style>

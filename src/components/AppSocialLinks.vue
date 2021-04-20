<template>
  <div class="app-social-links">
    <a
      href="https://www.facebook.com/szutsoftware"
      class="app-social-links__link app-social-links__link--fb"
    >
      <img
        src="@/assets/facebook.svg"
        height="35"
        alt="Przejdź do naszego facebook'a"
      />
    </a>
    <a
      href="https://wa.link/w9xqu4"
      class="app-social-links__link app-social-links__link--fb"
    >
      <img
        src="@/assets/whatsapp.svg"
        height="35"
        alt="Przejdź do naszego whatsapp"
      />
    </a>
    <a
      href="https://www.instagram.com/szut_software/"
      class="app-social-links__link app-social-links__link--fb"
    >
      <img
        src="@/assets/instagram-sketched.svg"
        height="35"
        alt="Przejdź do naszego instagram"
      />
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

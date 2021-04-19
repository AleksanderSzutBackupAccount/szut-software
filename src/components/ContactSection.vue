<template>
  <section class="contact-section">
    <h3 class="contact-section__header">Skontakuj się</h3>
    <article>
      <div class="">
        <h5>Numer telefonu</h5>
        <h4>500 461 275</h4>
      </div>
      <div class="">
        <h5>Adres email</h5>
        <h4>konrakt@szut-software.com</h4>
      </div>
    </article>
    <contact-section-animate-image />
  </section>
</template>

<script>
import ContactSectionAnimateImage from "@/components/animate/ContactSectionAnimateImage";
export default {
  name: "ContactSection",
  components: { ContactSectionAnimateImage },
};
</script>

<style scoped></style>

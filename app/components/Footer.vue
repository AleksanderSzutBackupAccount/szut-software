<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'

const year = new Date().getFullYear()
</script>

<template>
  <footer id="kontakt" class="footer">
    <div class="footer__contact">
      <div class="footer__heading-group">
        <h3 class="footer__heading">Porozmawiajmy o Twoim projekcie.</h3>
        <p class="footer__sub">Napisz do nas, a my przygotujemy bezpłatną wycenę.</p>
      </div>
      <div class="footer__links">
        <a href="mailto:hello@szut.software" class="footer__link">
          <Mail :size="20" class="footer__link-icon" />
          hello@szut.software
        </a>
        <a href="tel:+48000000000" class="footer__link">
          <Phone :size="20" class="footer__link-icon" />
          +48 000 000 000
        </a>
        <div class="footer__link footer__link--static">
          <MapPin :size="20" class="footer__link-icon" />
          Warszawa, Polska
        </div>
      </div>
    </div>

    <div class="footer__meta">
      <p>&copy; {{ year }} SZUT.SOFTWARE. Wszelkie prawa zastrzeżone.</p>
      <p>SZUT.SOFTWARE SP. Z O.O., KRS 0001234257, NIP 2810109592, REGON 544450532</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%;
  border-top: 1px solid $color-border;
  background-color: $color-bg;
  padding-top: $space-20;
  padding-bottom: $space-10;

  &__contact {
    @include container;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: $space-10;
    margin-bottom: $space-16;

    @include md {
      flex-direction: row;
      align-items: center;
    }
  }

  &__heading {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-2;
  }

  &__sub {
    color: $color-muted;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: $space-4;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: $space-3;
    color: $color-muted-light;
    font-size: $font-size-lg;
    transition: color 0.2s ease;

    &:not(&--static):hover {
      color: $color-accent;
    }

    &--static {
      color: $color-muted-dark;
      cursor: default;
    }
  }

  &__link-icon {
    color: $color-accent;
    flex-shrink: 0;
  }

  &__meta {
    @include container;
    padding-top: $space-10;
    border-top: 1px solid $color-border-subtle;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: $space-4;
    font-size: $font-size-xs;
    color: $color-muted-dark;
    font-weight: 500;
    letter-spacing: 0.05em;

    @include md {
      flex-direction: row;
    }

    @include lg {
      text-align: left;
    }
  }
}
</style>

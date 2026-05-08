<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import { ExternalLink, ArrowUpRight } from 'lucide-vue-next'

const containerRef = useTemplateRef<HTMLElement>('container')

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start'],
})

const y1          = useTransform(scrollYProgress, [0, 1], [100, -100])
const y2          = useTransform(scrollYProgress, [0, 1], [200, -200])
const opacity     = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
const yBadge      = useTransform(scrollYProgress, [0, 1], [50, -150])
const yPhoneRight = useTransform(scrollYProgress, [0, 1], [-50, 250])
</script>

<template>
  <section id="portfolio" ref="container" class="portfolio">
    <div class="portfolio__glow" aria-hidden="true" />

    <div class="portfolio__inner">

      <!-- Header -->
      <div class="portfolio__header">
        <motion.div :style="{ opacity }">
          <h2 class="portfolio__title">
            Wybrane <span class="portfolio__title-accent">Realizacje</span>
          </h2>
          <p class="portfolio__desc">
            Zobacz projekty, które zrealizowaliśmy z dbałością o detale, wydajność i konwersję.
          </p>
        </motion.div>
        <motion.a
          href="#wiecej"
          :style="{ opacity }"
          class="portfolio__all-link"
        >
          Zobacz wszystkie
          <ArrowUpRight :size="16" class="portfolio__all-link-icon" />
        </motion.a>
      </div>

      <!-- Project: Caredo.pl -->
      <div class="project project--laptop-left">

        <div class="project__visual">
          <motion.div :style="{ y: y1 }" class="project__laptop">
            <div class="project__laptop-screen">
              <div class="project__laptop-bar">
                <span class="project__laptop-dot project__laptop-dot--red" />
                <span class="project__laptop-dot project__laptop-dot--yellow" />
                <span class="project__laptop-dot project__laptop-dot--green" />
              </div>
              <div class="project__laptop-window">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBVSXxlbnwxfHx8fDE3NzgxNjA2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Caredo.pl Dashboard"
                  class="project__laptop-img"
                />
                <div class="project__laptop-overlay">
                  <span class="project__laptop-label">Wizualizacja aplikacji</span>
                </div>
              </div>
            </div>
            <div class="project__laptop-base">
              <div class="project__laptop-chin" />
            </div>
          </motion.div>

          <motion.div :style="{ y: yBadge }" class="project__badge">
            <div class="project__badge-icon">
              <span class="project__badge-dot" />
            </div>
            <div>
              <p class="project__badge-label">Wydajność</p>
              <p class="project__badge-value">+ 99.9%</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          :initial="{ opacity: 0, x: 50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="project__info"
        >
          <div class="project__tag project__tag--red">Aplikacja Webowa</div>
          <h3 class="project__title">Caredo.pl</h3>
          <p class="project__desc">
            Zaawansowana platforma CRM dedykowana dla branży usługowej. System pozwala na kompleksowe zarządzanie klientami, rezerwacjami oraz procesami wewnętrznymi, minimalizując czas obsługi i maksymalizując zyski.
          </p>
          <ul class="project__features">
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Złożony panel analityczny z danymi w czasie rzeczywistym
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Integracja z zewnętrznymi bramkami płatności
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--red" />
              Moduł rezerwacji online oparty na kalendarzach
            </li>
          </ul>
          <a
            href="https://caredo.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="project__link project__link--red"
          >
            Odwiedź stronę
            <ExternalLink :size="16" class="project__link-icon" />
          </a>
        </motion.div>
      </div>

      <!-- Project: 2motion.pl -->
      <div class="project project--phones-right">

        <motion.div
          :initial="{ opacity: 0, x: -50 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :viewport="{ once: true, margin: '-100px' }"
          :transition="{ duration: 0.8 }"
          class="project__info"
        >
          <div class="project__tag project__tag--orange">Strona Wizerunkowa / eCommerce</div>
          <h3 class="project__title">2motion.pl</h3>
          <p class="project__desc">
            Nowoczesna strona WWW z elementami e-commerce, stworzona dla dynamicznie rozwijającej się marki. Oparta na najnowszych technologiach, gwarantuje błyskawiczne ładowanie i doskonałe wrażenia na urządzeniach mobilnych.
          </p>
          <ul class="project__features">
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Niestandardowe animacje 3D (WebGL / Spline)
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Optymalizacja SEO podnosząca widoczność w Google
            </li>
            <li class="project__feature">
              <span class="project__feature-dot project__feature-dot--orange" />
              Płynne przejścia między podstronami (PWA)
            </li>
          </ul>
          <a
            href="https://2motion.pl"
            target="_blank"
            rel="noopener noreferrer"
            class="project__link project__link--orange"
          >
            Odwiedź stronę
            <ExternalLink :size="16" class="project__link-icon" />
          </a>
        </motion.div>

        <div class="project__phones">
          <motion.div :style="{ y: y2 }" class="project__phone project__phone--left">
            <div class="project__phone-notch" />
            <div class="project__phone-screen">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="2motion Mobile view"
                class="project__phone-img"
              />
              <div class="project__phone-overlay" />
            </div>
          </motion.div>

          <motion.div :style="{ y: yPhoneRight }" class="project__phone project__phone--right">
            <div class="project__phone-notch project__phone-notch--wide" />
            <div class="project__phone-screen">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwbGFuZGluZyUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzc4MTU3MDk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="2motion Mobile view alternate"
                class="project__phone-img project__phone-img--scroll"
              />
              <div class="project__phone-home-bar" />
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.portfolio {
  position: relative;
  padding-block: $space-32;
  padding-inline: $space-6;
  width: 100%;
  background-color: $color-bg-alt;
  overflow: hidden;

  &__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background-color: rgba(252, 68, 69, 0.05);
    border-radius: 9999px;
    filter: blur(150px);
    pointer-events: none;
  }

  &__inner {
    @include container;
    position: relative;
    z-index: 10;
  }

  &__header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: $space-24;
    gap: $space-8;

    @include md {
      flex-direction: row;
    }
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-4;

    @include md {
      font-size: $font-size-5xl;
    }
  }

  &__title-accent {
    color: $color-accent;
  }

  &__desc {
    color: $color-muted;
    max-width: 576px;
    font-size: $font-size-lg;
  }

  &__all-link {
    display: flex;
    align-items: center;
    gap: $space-2;
    color: $color-accent;
    font-size: $font-size-sm;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
    border-bottom: 1px solid rgba(252, 68, 69, 0.3);
    padding-bottom: 4px;
    transition: color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: $color-text;
      border-color: $color-text;
    }
  }

  &__all-link-icon {
    transition: transform 0.2s ease;

    .portfolio__all-link:hover & {
      transform: translate(4px, -4px);
    }
  }
}

.project {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $space-16;
  margin-bottom: $space-40;

  &:last-child {
    margin-bottom: 0;
  }

  @include lg {
    flex-direction: row;
  }

  &--laptop-left {
    .project__visual {
      order: 2;

      @include lg {
        order: 1;
        width: 50%;
      }
    }

    .project__info {
      order: 1;

      @include lg {
        order: 2;
        width: 50%;
      }
    }
  }

  &--phones-right {
    .project__info {
      @include lg {
        width: 50%;
      }
    }

    .project__phones {
      @include lg {
        width: 50%;
      }
    }
  }

  &__visual {
    position: relative;
    width: 100%;
  }

  &__laptop {
    position: relative;
    margin-inline: auto;
    width: 100%;
    max-width: 600px;
  }

  &__laptop-screen {
    position: relative;
    padding-top: 62.5%;
    background-color: #1f2937;
    border-radius: 24px 24px 0 0;
    border: 6px solid #111827;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  &__laptop-bar {
    position: absolute;
    inset: 0;
    height: 24px;
    background-color: #111827;
    border-radius: 18px 18px 0 0;
    display: flex;
    align-items: center;
    padding-inline: 12px;
    gap: 6px;
    opacity: 0.8;
    z-index: 10;
  }

  &__laptop-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px;

    &--red    { background-color: rgba(239, 68, 68, 0.8); }
    &--yellow { background-color: rgba(234, 179, 8, 0.8); }
    &--green  { background-color: rgba(34, 197, 94, 0.8); }
  }

  &__laptop-window {
    position: absolute;
    inset: 0;
    background-color: #000;
    overflow: hidden;

    &:hover .project__laptop-img {
      opacity: 1;
      transform: scale(1.05);
    }

    &:hover .project__laptop-overlay {
      opacity: 1;
    }
  }

  &__laptop-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    opacity: 0.8;
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  &__laptop-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent, transparent);
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 24px;
  }

  &__laptop-label {
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: 9999px;
    color: $color-text;
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  &__laptop-base {
    position: relative;
    height: 24px;
    background-color: #374151;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
  }

  &__laptop-chin {
    width: 192px;
    height: 6px;
    background-color: #1f2937;
    border-radius: 0 0 8px 8px;
    opacity: 0.5;
  }

  &__badge {
    position: absolute;
    right: -32px;
    bottom: -32px;
    background-color: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(24px);
    border: 1px solid $color-border-subtle;
    padding: $space-4;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    gap: $space-4;

    @include md {
      display: flex;
    }
  }

  &__badge-icon {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background-color: rgba(59, 130, 246, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__badge-dot {
    width: 16px;
    height: 16px;
    border-radius: 9999px;
    background-color: #3b82f6;
    box-shadow: 0 0 10px #3b82f6;
    display: block;
  }

  &__badge-label {
    color: $color-text;
    font-size: $font-size-sm;
    font-weight: 700;
  }

  &__badge-value {
    color: #4ade80;
    font-size: $font-size-xs;
    font-family: monospace;
  }

  &__phones {
    position: relative;
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  &__phone {
    position: absolute;
    background-color: #111827;
    border-radius: 48px;
    padding: 12px;
    border: 6px solid #1f2937;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
    overflow: hidden;

    &--left {
      width: 200px;
      height: 420px;
      transform: rotate(-6deg);
      z-index: 10;
      margin-left: -192px;
      margin-top: 80px;

      @include sm {
        width: 240px;
        height: 500px;
        margin-left: -224px;
      }

      &:hover .project__phone-img {
        transform: scale(1.1);
      }

      &:hover .project__phone-overlay {
        background-color: transparent;
      }
    }

    &--right {
      width: 220px;
      height: 460px;
      transform: rotate(3deg);
      z-index: 20;
      margin-left: 128px;
      margin-top: -40px;
      transition: transform 0.3s ease;

      @include sm {
        width: 260px;
        height: 540px;
        margin-left: 192px;
      }

      &:hover {
        z-index: 30;
      }

      &:hover .project__phone-img {
        transform: translateY(-40px);
      }
    }
  }

  &__phone-notch {
    position: absolute;
    top: 0;
    inset-x: 0;
    height: 24px;
    background-color: #000;
    border-radius: 48px 48px 0 0;
    display: flex;
    justify-content: center;
    z-index: 20;

    &::after {
      content: '';
      display: block;
      width: 64px;
      height: 16px;
      background-color: #000;
      border-radius: 0 0 12px 12px;
      margin-top: -2px;
    }

    &--wide::after {
      width: 80px;
      height: 20px;
      border-radius: 0 0 16px 16px;
    }
  }

  &__phone-screen {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
    border: 1px solid $color-border-subtle;
  }

  &__phone-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    opacity: 0.9;
    transition: transform 0.7s ease;

    &--scroll {
      height: 150%;
      object-position: bottom;
      transition: transform 1s ease;
    }
  }

  &__phone-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color 0.5s ease;
  }

  &__phone-home-bar {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 33%;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
  }

  &__info {
    width: 100%;

    @include lg {
      width: 50%;
    }
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    font-size: $font-size-xs;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: $space-4;
    padding: 4px 12px;
    border-radius: 9999px;

    &--red {
      color: $color-accent;
      background-color: rgba(252, 68, 69, 0.1);
    }

    &--orange {
      color: #f97316;
      background-color: rgba(249, 115, 22, 0.1);
    }
  }

  &__title {
    font-size: $font-size-4xl;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $space-6;

    @include sm {
      font-size: $font-size-5xl;
    }
  }

  &__desc {
    color: $color-muted;
    font-size: $font-size-lg;
    line-height: 1.7;
    margin-bottom: $space-8;
  }

  &__features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $space-4;
    margin-bottom: $space-10;
    color: $color-muted-light;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__feature-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    flex-shrink: 0;

    &--red    { background-color: $color-accent; }
    &--orange { background-color: #f97316; }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: $space-2;
    padding: $space-3 $space-6;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid $color-border-subtle;
    border-radius: 9999px;
    color: $color-text;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &--red:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(252, 68, 69, 0.5);
    }

    &--orange:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(249, 115, 22, 0.5);
    }
  }

  &__link-icon {
    color: #9ca3af;
    transition: color 0.2s ease;

    .project__link--red:hover & {
      color: $color-accent;
    }

    .project__link--orange:hover & {
      color: #f97316;
    }
  }
}
</style>

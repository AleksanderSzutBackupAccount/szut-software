<template>
    <header
        ref="content"
        :class="{ 'app-header--scrolled': scrolled }"
        class="app-header"
    >
        <div class="app-header__wrapper">
            <div class="app-header__inner">
                <router-link
                    :to="{ name: 'home' }"
                    class="app-header__logo-wrapper"
                >
                    <img
                        :alt="`${$t('app-name')} 'logo`"
                        class="app-header__logo"
                        src="@/assets/branding/logo.svg"
                    />
                </router-link>
                <app-navigation class="app-header__nav" />
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    import AppNavigation from "@/components/AppNavigation.vue";
    import { onMounted, onUnmounted, ref } from "vue";

    const scrolled = ref<boolean>(false);

    const doScroll = () => {
        scrolled.value = window.scrollY > 100;
    };

    onMounted(() => {
        window.addEventListener("scroll", doScroll);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", doScroll);
    });
</script>

<style lang="scss">
    body {
        padding-top: 120px !important;
    }
    .app-header {
        $app-header: &;
        width: 100%;
        height: 100px;
        top: 0;
        z-index: 9999;
        transition: all ease-in-out 0.25s;
        color: $primary-color;
        position: fixed;
        border-bottom: 1px solid $background-color;

        * {
            transition: all ease-in-out 0.25s;
        }

        img {
            transition: filter ease-in-out 0.25s;
        }

        &:hover {
            height: 100px;
        }

        &:not(&--scrolled) {
            border-color: transparent;
        }

        &__wrapper {
            height: 100px;
            justify-content: center;
            display: flex;
            align-items: stretch;
        }

        &--scrolled {
            background-color: white;

            &:not(&:hover) {
                height: 80px;

                #{$app-header}__wrapper {
                    transform: translateY(-10px);
                }

                #{$app-header}__logo {
                    transform: scale(0.8);
                    transform-origin: center right;
                }
            }
        }

        &--colored {
            color: white;
            background-color: $primary-color;
            * {
                border-color: white !important;
            }
            img {
                filter: brightness(0) invert(1);
            }
        }

        &__inner {
            width: 80%;
            min-width: 320px;
            display: flex;
            justify-content: space-between;
            align-items: stretch;

            max-width: 100vw;
        }

        &__logo {
            height: 60px;
        }

        &__logo-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
        }

        &__social-links {
        }
    }
</style>

<template>
    <header
        :class="{ 'main-header--collapsed': isCollapsed }"
        class="main-header"
    >
        <div class="main-header__wrapper">
            <div class="main-header__inner">
                <main-header-logo />
                <main-navigation-desktop
                    class="main-header__nav"
                    :shrinked="isCollapsed"
                />
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    import MainNavigationDesktop from "@/modules/main/Layouts/Header/MainNavigationDesktop.vue";
    import { computed, onMounted, onUnmounted, ref } from "vue";
    import MainHeaderLogo from "@/modules/main/Layouts/Header/MainHeaderLogo.vue";

    const isScrolled = ref<boolean>(false);
    const isCollapsed = computed(() => isScrolled.value);

    const doScroll = () => {
        isScrolled.value = window.scrollY > 50;
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

    .main-header {
        $app-header: &;
        width: 100%;
        height: 100px;
        top: 0;
        z-index: 9999;
        transition: all ease-in-out 0.25s;
        color: $primary-color;
        position: fixed;
        border-bottom: 1px solid $background-color;
        overflow: hidden;
        * {
            transition: all ease-in-out 0.25s;
        }

        &:hover {
            height: 100px;
        }

        &:not(&--collapsed) {
            border-color: transparent;
        }

        &__wrapper {
            height: 100px;
            justify-content: center;
            display: flex;
            align-items: stretch;
        }

        &--collapsed {
            background-color: white;

            &:not(&:hover) {
                height: 80px;

                #{$app-header}__wrapper {
                    transform: translateY(-10px);
                }

                #{$app-header}__logo {
                    transform: scale(0.8);
                    transform-origin: center center;
                }

                .main-navigation__indicator {
                    bottom: 10px;
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
            transition: all ease 0.2s;
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

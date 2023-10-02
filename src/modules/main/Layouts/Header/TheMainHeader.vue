<template>
    <header
        ref="header"
        :class="{
            'main-header--shrink': navBar.shrink,
            'main-header--open': navBar.open,
            'main-header--scrolled': navBar.scrolled,
        }"
        class="main-header"
        :style="{ backgroundColor: 'rgba(255, 255, 255, ' + opacity + ')' }"
    >
        <div class="main-header__wrapper">
            <div class="main-header__inner">
                <main-header-logo />
                <main-navigation-desktop
                    v-if="desktop"
                    class="main-header__nav"
                    :shrink="navBar.shrink"
                />
                <main-navigation-mobile v-else />
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
    import { onMounted, reactive, Ref, ref } from "vue";

    import MainHeaderLogo from "@/modules/main/Layouts/Header/MainHeaderLogo.vue";
    import MainNavigationDesktop from "@/modules/main/Layouts/Header/MainNavigationDesktop.vue";
    import MainNavigationMobile from "@/modules/main/Layouts/Header/MainNavigationMobile.vue";
    import { BreakPointsComposable } from "@/composable/BreakPointsComposable";
    import { TweenMax } from "gsap";

    const { desktop } = BreakPointsComposable();

    const navBar = reactive({
        open: true,
        shrink: false,
        scrolled: false,
    });
    const scrollState = ref(0);
    const header = ref() as Ref<HTMLElement>;

    const opacity = ref(0);

    type scrollFunc = () => void;
    const scrollDetect = (
        reset: scrollFunc,
        down: scrollFunc,
        up: scrollFunc,
        scrolled: scrollFunc
    ) => {
        if (scrollTop() / 150) {
            opacity.value = scrollTop() / 150;
            scrolled();
        }
        const currentScroll = scrollTop();
        if (scrollTop() < 50) {
            reset();
        } else if (currentScroll > scrollState.value) {
            down();

            if (scrollState.value > window.innerHeight) {
                collapseNavBar();
            }
        } else {
            up();
        }
        scrollState.value = scrollTop();
    };

    const scrollTop = () => {
        return window.scrollY;
    };

    const openNavBar = () => {
        if (navBar.open) {
            return;
        }

        if (header.value instanceof HTMLElement) {
            TweenMax.to(header.value, 0.5, {
                y: -20,
                opacity: 1,
            });
            navBar.open = true;
        }
    };
    const collapseNavBar = () => {
        if (!navBar.open) {
            return;
        }

        if (header.value instanceof HTMLElement) {
            TweenMax.to(header.value, 0.5, {
                y: -header.value.getBoundingClientRect().height,
                opacity: 0,
            });
            navBar.open = false;
        }
    };
    const scrollReset = () => {
        navBar.open = true;
        navBar.shrink = false;
        navBar.scrolled = false;
    };
    const scrolled = () => {
        navBar.scrolled = true;
    };
    const scrollDown = () => {
        navBar.shrink = true;
    };
    const scrollUp = () => {
        openNavBar();
    };

    onMounted(() => {
        window.addEventListener("scroll", () => {
            scrollDetect(scrollReset, scrollDown, scrollUp, scrolled);
        });
    });
</script>

<style lang="scss">
    body {
        padding-top: 120px !important;
    }

    $nav-bar-height: 100px;

    .main-header {
        $app-header: &;
        width: 100%;
        height: var(--nav-bar-height);
        top: 0;
        z-index: 9999;
        color: #333;
        position: fixed;
        border-bottom: 1px solid $background-color;
        transition: opacity ease-out 0.2s, transform ease-out 0.4s;

        &:not(&--scrolled) {
            border-color: transparent;
        }

        &__wrapper {
            height: 100px;
            justify-content: center;
            display: flex;
            align-items: stretch;
            transition: opacity ease-out 0.2s, transform ease-out 0.4s;
        }
        &__inner {
            width: 80%;
            min-width: 320px;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            max-width: 100vw;
        }
        &__logo-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
            transition: opacity ease-out 0.2s, transform ease-out 0.4s;
        }

        &__logo {
            height: 60px;
        }

        &--shrink {
            &:not(:hover) {
                transform: translateY(-20px);

                transition: bottom ease-out 0.45s;

                #menu-indicator {
                    bottom: 10px;
                }

                #{$app-header}__logo-wrapper {
                    will-change: transform;
                    transform-origin: center center;
                    transform: scale(0.8);
                }

                #{$app-header}__wrapper {
                    will-change: transform;
                    transform: translateY(10px);
                }
            }
        }
    }
</style>

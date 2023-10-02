<script lang="ts" setup>
    import { onMounted, reactive, ref } from "vue";
    import MainHeaderLogo from "@/modules/main/Layouts/Header/MainHeaderLogo.vue";
    import BurgerButton from "@/components/BurgerButton.vue";

    const isOpen = ref(false);
    const navigationItems = reactive([
        "home",
        "services",
        "technologies",
        "about-us",
    ]);
    const isScrolled = ref(false);

    const headerStyles = (collapsed: boolean) => {
        return {
            transform: collapsed ? "translateY(-20px)" : null,
            paddingTop: collapsed ? "20px" : null,
            maxHeight: collapsed ? "80px" : "100px",
            borderColor: collapsed ? "#fff1f1" : null,
        };
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    onMounted(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                isScrolled.value = true;
            } else {
                isScrolled.value = false;
            }
        });
    });
</script>
<template>
    <div
        class="main-header-mobile"
        :class="{ 'main-header-mobile--open': isOpen }"
    >
        <header
            class="main-header-mobile__header"
            :style="headerStyles(isScrolled && !isOpen)"
        >
            <main-header-logo />
            <burger-button :is-open="isOpen" @click="toggle" />
        </header>
        <nav class="main-header-mobile__menu mobile-nav">
            <router-link
                v-for="item in navigationItems"
                :key="item"
                class="mobile-nav__item"
                :to="{ name: item }"
                @click.prevent="toggle"
            >
                {{ $t(`views.${item}.nav-title`) }}
            </router-link>

            <router-link
                class="mobile-nav__item"
                :to="{ name: 'contact' }"
                @click.prevent="toggle"
            >
                <div class="main-navigation-desktop__item-action-button">
                    {{ $t(`views.contact.nav-title`) }}
                </div>
            </router-link>
        </nav>
    </div>
</template>
<style lang="scss">
    .main-header-mobile {
        $root: &;
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &__header {
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 120px;
            position: absolute;
            width: 100%;
            top: 0;
            border-bottom: 1px solid #fff;
            transition: all ease-out 0.3s;
        }

        &__menu {
            width: 80%;
            height: 50%;
            opacity: 0;
            transition: all ease-out 0.3s;
        }

        &:not(&--open) {
            #{$root}__menu {
                pointer-events: none;
            }
        }

        &--open {
            #{$root}__menu {
                opacity: 1;
            }

            #{$root}__header {
                background-color: transparent;
            }

            background-color: white;
        }
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__item {
            margin: 20px 0;
            cursor: pointer;
            font-size: 24px;
            text-decoration: none;
            color: black;
        }
    }
</style>

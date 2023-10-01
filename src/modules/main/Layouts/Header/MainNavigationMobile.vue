<template>
    <div class="main-navigation-mobile">
        <main-navigation-mobile-wrapper>
            <nav class="main-navigation-mobile__wrapper">
                <main-navigation-items
                    ref="links"
                    :class-name="NAV_ITEM_CLASS_NAME"
                />

                <router-link
                    class="main-navigation-mobile__item-action"
                    :to="{ name: 'contact' }"
                >
                    <div class="main-navigation-mobile__item-action-button">
                        {{ $t(`views.contact.nav-title`) }}
                    </div>
                </router-link>
            </nav>
        </main-navigation-mobile-wrapper>
    </div>
</template>

<script lang="ts" setup>
    import MainNavigationItems from "@/modules/main/Layouts/Header/MainNavigationItems.vue";
    import MainNavigationMobileWrapper from "@/modules/main/Layouts/Header/Mobile/MainNavigationMobileWrapper.vue";

    const NAV_ITEM_CLASS_NAME = "main-navigation-mobile__item";
</script>

<style lang="scss" scoped></style>

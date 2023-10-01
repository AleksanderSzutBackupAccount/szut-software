<script setup lang="ts">
    import BurgerButton from "@/components/BurgerButton.vue";
</script>

<template>
    <div class="main-navigation-mobile-wrapper">
        <burger-button />
        <div v-show="false" class="main-navigation-mobile-wrapper__menu">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .main-navigation-mobile-wrapper {
        &__menu {
        }

        &__button {
        }
    }
</style>

<template>
    <nav class="app-navigation">
        <router-link
            v-for="item in navigationItems"
            :key="item"
            class="app-navigation__item"
            :to="{ name: item }"
        >
            {{ $t(`views.${item}.nav-title`) }}
        </router-link>
    </nav>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";

    const navigationItems = reactive([
        "home",
        "contact",
        "services",
        "technologies",
        "about-us",
    ]);
</script>

<style lang="scss" scoped>
    .app-navigation {
        display: flex;
        &__item {
        }
    }
</style>

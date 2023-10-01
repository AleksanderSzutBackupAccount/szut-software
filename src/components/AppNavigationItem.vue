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

<script lang="ts" setup></script>

<style lang="scss" scoped>
    .app-navigation {
        display: flex;
        &__item, &__item-action {
            color: inherit;
            font-size: 20px;
            text-decoration: none;
            padding: 0 24px;
            height: 100%;
            transition: all ease-in-out .2s;
            &:hover {
                transform: scale(1.1);
            }
        }
        &__item-action {
            border: 1.5px solid $primary-color;
            border-radius: 10px;
            margin-left: 16px;
        }
    }
</style>

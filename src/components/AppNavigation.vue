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

        <router-link
            class="app-navigation__item-action"
            :to="{ name: 'contact' }"
        >
            <div class="app-navigation__item-action-button">
                {{ $t(`views.contact.nav-title`) }}
            </div>
        </router-link>
    </nav>
</template>

<script lang="ts" setup>
    import { reactive } from "vue";

    const navigationItems = reactive([
        "home",
        "services",
        "technologies",
        "about-us",
    ]);
</script>

<style lang="scss" scoped>
    .app-navigation {
        display: flex;
        align-items: stretch;
        font-weight: 600 !important;

        $app-nav: &;

        &:hover {
            #{$app-nav}__item {
                &:not(&:hover):after {
                    opacity: 0 !important;
                }
            }
        }

        &__item,
        &__item-action {
            display: flex;
            color: inherit;
            font-size: 20px;
            align-items: center;

            text-decoration: none;
            padding: 0 24px;
            transition: all ease-in-out 0.2s;
            position: relative;

            &:hover {
            }
        }

        &__item {
            $parent: &;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 2px;
                transition: all ease-in-out 0.1s 0.1s;
                display: block;
                background-color: $primary-color;
                opacity: 0;
            }

            &:hover:after {
                opacity: 1;
            }

            &:-moz-any(&--active):after {
                opacity: 1;
            }

            &:-webkit-any(&--active):after {
                opacity: 1;
            }
        }

        &__item-action {
            margin-left: 16px;
        }

        &__item-action-button {
            padding: 8px 16px;
            border: 1.5px solid $primary-color;
            color: white;
            background-color: $primary-color;
            border-radius: 10px;
            margin-left: 16px;
        }
    }
</style>

<template>
    <header class="app-header">
        <router-link :to="{ name: 'home' }">
            <img
                src="@/assets/logo.svg"
                :alt="`${getAppName()} logo`"
                class="app-header__logo"
            />
        </router-link>
        <app-navigation class="app-header__nav" />
    </header>
</template>

<script>
    import AppNavigation from "@/components/AppNavigation.vue";

    export default {
        name: "AppHeader",
        components: { AppNavigation },
    };
</script>

<style lang="scss" scoped>
    .app-header {
        display: flex;
        margin: 0 auto;
        align-items: flex-start;
        justify-content: space-between;
        max-width: 1300px;
        width: 100%;
        padding: 20px 0 50px 0;

        &__logo {
            width: 30vw;
            min-width: 120px;
            max-width: 180px;
        }

        &__social-links {
        }
    }
</style>

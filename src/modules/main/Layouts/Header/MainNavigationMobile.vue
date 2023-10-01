<template>
    <nav class="app-navigation">
        <!--        <main-navigation-items ref="links" />-->

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

<script lang="ts" setup></script>

<style lang="scss" scoped></style>

<script setup lang="ts"></script>

<template>
    <router-link :to="{ name: 'home' }" class="main-header__logo-wrapper">
        <img
            :alt="`${$t('main-name')} 'logo`"
            class="main-header__logo"
            src="@/assets/branding/logo.svg"
        />
    </router-link>
</template>

<style scoped lang="scss"></style>

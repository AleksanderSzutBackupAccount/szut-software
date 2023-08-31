<template>
    <nav class="app-navigation">
        <router-link :to="{ name: 'home' }"> Home</router-link>
        <router-link :to="{ name: 'contact' }"> contact</router-link>
        <router-link :to="{ name: 'services' }"> services</router-link>
        <router-link :to="{ name: 'technologies' }"> technologies</router-link>
        <router-link :to="{ name: 'about-us' }"> About Us</router-link>
    </nav>
</template>

<script lang="ts">
export default {
    name: "AppNavigation"
};
</script>

<style scoped></style>

<script setup lang="ts">
    import {
        defineEmits,
        defineProps,
        onMounted,
        onUpdated,
        ref,
        Ref,
        watch,
    } from "vue";
    import { useRoute } from "vue-router";

    const SELECTOR = ".app-navigation__item";
    const SELECTOR_ACTIVE = ".app-navigation__item--active";

    const route = useRoute();

    const props = defineProps({
        navigationItems: {
            type: Array,
            required: true,
        },
    });
    const emit = defineEmits<{
        (e: "tilt", event: Event): void;
        (e: "activate", event: Event): void;
        (e: "change", element: HTMLElement): void;
        (e: "hover", event: Event): void;
    }>();

    let activeItem = ref() as Ref<HTMLElement>;

    watch(activeItem, (newVal: HTMLElement) => {
        if (newVal === null) {
            return;
        }
        emit("change", newVal);
    });
    watch(
        () => route.name,
        async () => {
            reload();
        }
    );

    const emitActivate = (e: Event) => {
        emit("activate", e);
    };
    const emitTilt = (e: Event) => {
        emit("tilt", e);
    };

    const emitHover = (e: Event) => {
        emit("hover", e);
    };

    const reload = () => {
        activeItem.value = document.querySelector(
            SELECTOR_ACTIVE
        ) as HTMLElement;
    };

    onUpdated(() => {
        reload();
    });

    onMounted(async () => {
        setTimeout(() => {
            reload();
            document.querySelectorAll(SELECTOR).forEach((item) => {
                item.addEventListener("mouseenter", emitHover);
                item.addEventListener("mouseleave", emitHover);
                item.addEventListener("touchstart", emitTilt);
                item.addEventListener("mousedown", emitTilt);
                item.addEventListener("touchend", emitActivate);
                item.addEventListener("mouseup", emitActivate);
            });
        }, 5);
    });
    // eslint-disable-next-line no-undef
    defineExpose({ reload });
</script>

<template>
    <router-link
        v-for="item in props.navigationItems"
        :key="item"
        class="app-navigation__item"
        :class="{
            'app-navigation__item--active': route.name === item,
        }"
        :to="{ name: item }"
    >
        {{ $t(`views.${item}.nav-title`) }}
    </router-link>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
    import {
        defineEmits,
        defineProps,
        onMounted,
        onUpdated,
        reactive,
        ref,
        Ref,
        watch,
    } from "vue";
    import { useRoute } from "vue-router";

    const route = useRoute();

    const props = defineProps({
        className: {
            type: String,
            required: true,
        },
    });
    const getClass = (): { active: string; normal: string } => {
        return {
            active: `${props.className}--active`,
            normal: props.className,
        };
    };
    const getClassList = (item: string) => {
        const classes = getClass();
        return {
            [classes.normal]: true,
            [classes.active]: route.name === item,
        };
    };

    const navigationItems = reactive([
        "home",
        "services",
        "technologies",
        "about-us",
    ]);

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
            "." + getClass().active
        ) as HTMLElement;
    };

    onUpdated(() => {
        reload();
    });

    onMounted(async () => {
        setTimeout(() => {
            reload();
            document
                .querySelectorAll("." + getClass().normal)
                .forEach((item) => {
                    item.addEventListener("mouseenter", emitHover);
                    item.addEventListener("mouseleave", emitHover);
                    item.addEventListener("touchstart", emitTilt);
                    item.addEventListener("mousedown", emitTilt);
                    item.addEventListener("touchend", emitActivate);
                    item.addEventListener("mouseup", emitActivate);
                });
        }, 50);
    });
    // eslint-disable-next-line no-undef
    defineExpose({ reload });
</script>

<template>
    <router-link
        v-for="item in navigationItems"
        :key="item"
        :class="getClassList(item)"
        :to="{ name: item }"
    >
        {{ $t(`views.${item}.nav-title`) }}
    </router-link>
</template>

<template>
    <nav class="app-navigation">
        <router-links
            ref="links"
            :navigation-items="navigationItems"
            @tilt="tilt"
            @activate="activateTab"
            @change="onItemChange"
            @hover="onHover"
        />
        <div
            ref="indicator"
            class="app-navigation__indicator"
            :class="{
                'app-navigatidon__indicator--hide': hidden,
                'app-navigation__indicator--shrinked': props.shrinked,
            }"
        />

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
    import { defineProps, reactive, ref, Ref } from "vue";
    import { Back, Power4, TweenMax } from "gsap";
    import RouterLinks from "@/modules/main/Layouts/Header/MainNavigatioItems.vue";

    type RouterLinksType = typeof RouterLinks extends new () => infer T
        ? T
        : never;

    const props = defineProps({
        shrinked: {
            type: Boolean,
            default: true,
        },
    });
    const NAV_ITEM_SELECTOR = "app-navigation__item";
    const indicator = ref();
    const hidden = ref(true);
    const PADDING = 12;

    let defaultProperties = {
        x: 0,
        width: 0,
    };
    const links = ref() as Ref<RouterLinksType>;
    const navigationItems = reactive([
        "home",
        "services",
        "technologies",
        "about-us",
    ]);

    function getVars(positionX: number, width: number) {
        return { x: positionX + PADDING, width: width - PADDING * 2 };
    }

    const setIndicatorPos = (target: HTMLElement) => {
        const positionX = target.offsetLeft;
        const width = target.getBoundingClientRect().width;

        TweenMax.set(indicator.value, getVars(positionX, width));
    };

    function moveIndicatorFromPrimitives(positionX: number, width: number) {
        TweenMax.to(indicator.value, 0.1, getVars(positionX, width));
    }

    function moveIndicator(target: HTMLElement) {
        const positionX = target.offsetLeft;
        const width = target.getBoundingClientRect().width;
        moveIndicatorFromPrimitives(positionX, width);
    }

    const tilt = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains(NAV_ITEM_SELECTOR)) {
            TweenMax.to(e.target, 0.2, { scale: 0.7, ease: Power4.easeOut });
        }
    };

    const activateTab = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains(NAV_ITEM_SELECTOR)) {
            moveIndicator(target);
            TweenMax.to(e.target, 0.3, {
                scale: 1,
                ease: Back.easeOut.config(5),
            });
            links.value.reload();
        }
    };
    const onItemChange = (element: HTMLElement) => {
        if (defaultProperties.width === 0) {
            setIndicatorPos(element);
        } else {
            moveIndicator(element);
        }
        defaultProperties.width = element.getBoundingClientRect().width;
        defaultProperties.x = element.offsetLeft;
    };

    const resetIndicator = () => {
        moveIndicatorFromPrimitives(
            defaultProperties.x,
            defaultProperties.width
        );
    };

    const onHover = (e: Event) => {
        const target = e.target as HTMLElement;
        if (e.type === "mouseenter") {
            moveIndicator(target);
        } else {
            resetIndicator();
        }
    };
</script>

<style lang="scss">
    .app-navigation {
        $app-nav: &;
        display: flex;
        align-items: stretch;
        font-weight: 600 !important;
        overflow: hidden;
        position: relative;

        &:hover {
            #{$app-nav}__item {
                &:not(&:hover):after {
                    opacity: 0 !important;
                }
            }
        }

        &::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            display: block;
            z-index: -100;
        }

        &__item,
        &__item-action {
            display: flex;
            color: inherit;
            font-size: 18px;
            align-items: center;

            text-decoration: none;
            padding: 0 24px;
            transition: all ease-in-out 0.2s;
            position: relative;
            cursor: pointer;
        }

        &__indicator {
            $indicator: &;
            content: "";
            position: absolute;
            bottom: 0;
            height: 2px;
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.1s,
                opacity cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
            display: block;
            background-color: red;
            opacity: 1;

            &--hide {
                opacity: 0;
            }
        }

        &__item-action {
            margin-left: 16px;
        }

        &__item-action-button {
            padding: 16px 32px;
            border: 1.5px solid $primary-color;
            color: white;
            background-color: $primary-color;
            border-radius: 10px;
            margin-left: 8px;
        }
    }
</style>

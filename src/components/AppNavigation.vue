<template>
    <nav class="app-navigation">
        <router-links
            :navigation-items="navigationItems"
            @tilt="tilt"
            @activate="activateTab"
            @change="onItemChange"
        />
        <div
            ref="indicator"
            class="app-navigation__indicator"
            :class="{
                'app-navigatidon__indicator--hide': false,
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
    import { defineProps, reactive, ref } from "vue";
    import { Back, Power4, TweenMax } from "gsap";
    import RouterLinks from "@/components/RouterLinks.vue";

    const props = defineProps({
        shrinked: {
            type: Boolean,
            default: true,
        },
    });
    const NAV_ITEM_SELECTOR = "app-navigation__item";
    const indicator = ref();
    const navigationItems = reactive([
        "home",
        "services",
        "technologies",
        "about-us",
    ]);

    const setIndicatorPos = (target: HTMLElement) => {
        const positionX = target.offsetLeft;
        const width = target.getBoundingClientRect().width;

        TweenMax.set(indicator.value, { x: positionX, width: width });
    };

    const tilt = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains(NAV_ITEM_SELECTOR)) {
            TweenMax.to(e.target, 0.2, { scale: 0.8, ease: Power4.easeOut });
        }
    };
    const activateTab = (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains(NAV_ITEM_SELECTOR)) {
            const positionX = target.offsetLeft;
            const width = target.getBoundingClientRect().width;
            TweenMax.to(indicator.value, 0.5, { x: positionX, width: width });
            TweenMax.to(e.target, 0.3, {
                scale: 1,
                ease: Back.easeOut.config(5),
            });
        }
    };
    const onItemChange = (element: HTMLElement) => {
        console.log(element);
        setIndicatorPos(element);
    };
</script>

<style lang="scss">
    .app-navigation {
        display: flex;
        align-items: stretch;
        font-weight: 600 !important;
        overflow: hidden;
        position: relative;

        $app-nav: &;

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

            &:hover {
            }
        }

        &__indicator {
            content: "";
            position: absolute;
            bottom: 0;
            height: 2px;
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.2s,
                opacity cubic-bezier(0.4, 0, 0.2, 1) 0.5s;
            display: block;
            background-color: red;
            opacity: 1;

            &--hide {
                opacity: 0;
            }

            &--shrinked {
                transform: translateY(-10px);
                transition: transform ease-in-out 0.25s;
            }
        }

        .bounce {
        }

        &__item {
            $parent: &;
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

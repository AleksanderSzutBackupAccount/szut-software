<template>
    <header ref="content" class="app-header">
        <div class="app-header__inner">
            <router-link :to="{ name: 'home' }" class="app-header__logo-wrapper">
                <img
                    src="@/assets/branding/logo.svg"
                    :alt="`${$t('app-name')} 'logo`"
                    class="app-header__logo"
                />
            </router-link>
            <app-navigation class="app-header__nav" />
        </div>
    </header>
</template>

<script lang="ts" setup>


const content = ref()
const bottom = ref(false)
import { onMounted, onUnmounted, ref } from "vue";

const doScroll = (event:) => {
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const clientHeight = event.target.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
        bottom.value = true
    } else {
        bottom.value = false
    }
}

onMounted(() => {
    content.value.addEventListener('scroll', doScroll)
})

onUnmounted(() => {
    content.value.removeEventListener(doScroll)
})

</script>

<style lang="scss">
body {
    padding-top: 120px !important;
}
    .app-header {
        display: flex;
        width: 100%;
        height: 100px;
        top:0;
        justify-content: center;
        align-items: stretch;
        transition: all ease-in-out .25s;
        color: $primary-color;
        position: fixed;

        &--colored {
            color: white;
            background-color: $primary-color;
            * {
                border-color: white !important;
            }
            img {
                filter: brightness(0) invert(1);
            }

        }

        * {
            transition: border ease-in-out .25s;
        }
        img {
            transition: filter ease-in-out .25s;
        }

        &__inner {
            width: 80%;
            min-width: 320px;
            display: flex;
            justify-content: space-between;
            align-items: stretch;

            max-width: 100vw;
        }

        &__logo {
            height: 60px;
        }

        &__logo-wrapper {
            display: flex;
            align-items: center;
            height: 100%;
        }

        &__social-links {
        }
    }
</style>

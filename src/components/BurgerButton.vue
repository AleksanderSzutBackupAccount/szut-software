<script setup lang="ts">
    defineProps<{
        isOpen: boolean;
    }>();
</script>

<template>
    <div class="burger-button" :class="{ active: isOpen }">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<style lang="scss" scoped>
    .burger-button {
        display: flex;
        flex-direction: column;
        width: 50px;
        cursor: pointer;
        transform: rotate(180deg);

        span {
            background: black;
            border-radius: 10px;
            height: 6px;
            margin: 6px 0;
            transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6);
        }

        span:nth-of-type(1) {
            width: 50%;
        }

        span:nth-of-type(2) {
            width: 100%;
        }

        span:nth-of-type(3) {
            width: 75%;
        }

        &.active {
            span:nth-of-type(1) {
                transform-origin: bottom;
                transform: rotatez(45deg) translate(9px, 3px);
            }

            span:nth-of-type(2) {
                transform-origin: top;
                transform: rotatez(-45deg);
            }

            span:nth-of-type(3) {
                transform-origin: bottom;
                width: 50%;
                transform: translate(22px, -10px) rotatez(45deg);
            }
        }
    }
</style>

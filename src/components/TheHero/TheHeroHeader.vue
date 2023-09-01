<template>
    <header class="header">
        <h1 class="header__header">
            {{ $t("app-name") }}
        </h1>
        <h2 class="header__text">
            {{ $t("hero.text") }}
        </h2>
    </header>
</template>

<script>
    export default {
        name: "TheHeroHeader",
    };
</script>

<style lang="scss" scoped>
    .header {
        text-transform: uppercase;
        position: relative;
        padding: 50px 0 80px 0;

        &__header {
            font-weight: 600;
            line-height: 55px;
            font-size: 40px;

            @media (min-width: 340px) {
                line-height: 80px;
                max-width: 10ch;
                font-size: 55px;
            }
        }

        &__text {
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            @media (min-width: 340px) {
                line-height: 28px;
                max-width: 30ch;
                font-size: 17px;
            }
        }

        &:hover {
            &:before {
                transform: rotate(135deg);
            }
        }

        &::before {
            content: "";
            position: absolute;
            width: 160px;
            height: 160px;
            z-index: -1;
            transform: rotate(-45deg);
            border: 10px solid rgba(0, 0, 0, 0.05);

            transition: all ease-in-out 0.5s;
            @media (min-width: 340px) {
                width: 230px;
                height: 230px;
                border: 12px solid rgba(0, 0, 0, 0.05);
            }
        }
    }
</style>

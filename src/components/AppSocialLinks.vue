<template>
    <div class="app-social-links">
        <a
            href="https://www.facebook.com/szutsoftware"
            class="app-social-links__link app-social-links__link--fb"
            target="_blank"
        >
            <img
                src="@/assets/facebook.svg"
                class="app-social-links__image"
                alt="Przejdź do naszego facebook'a"
            />
        </a>
        <a
            href="https://telegram.me/a_szut"
            class="app-social-links__link app-social-links__link--fb"
            target="_blank"
        >
            <img
                src="@/assets/telegram.svg"
                class="app-social-links__image"
                alt="Przejdź do naszego telegrama"
            />
        </a>
        <a
            href="https://www.instagram.com/szut_software/"
            class="app-social-links__link app-social-links__link--fb"
            target="_blank"
        >
            <img
                src="@/assets/instagram-sketched.svg"
                class="app-social-links__image"
                alt="Przejdź do naszego instagram"
            />
        </a>
    </div>
</template>

<script>
    export default {
        name: "AppSocialLinks",
    };
</script>

<style lang="scss" scoped>
    .app-social-links {
        display: grid;
        grid-column-gap: 32px;
        grid-row-gap: 16px;
        justify-items: center;

        @media (min-width: 420px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        &__image {
            height: 35px;
        }

        &__link {
            padding: 5px;

            img {
                max-height: 35px;
            }
        }
    }
</style>

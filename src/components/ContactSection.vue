<template>
    <section class="contact-section">
        <h3 class="contact-section__header">Skontakuj się</h3>
        <article class="contact-section__article">
            <div class="contact-section__field">
                <div class="contact-section__label">Numer telefonu</div>
                <h4 class="contact-section__info">
                    <a href="tel:+48-793-448-398"> +48 793 448 398 </a>
                </h4>
            </div>
            <div class="contact-section__field">
                <div class="contact-section__label">Adres email</div>
                <h4 class="contact-section__info">
                    <a href="mailto:kontakt@szut-software.com">
                        kontakt@szut-software.com
                    </a>
                </h4>
            </div>
        </article>
        <contact-section-animate-image class="contact-section__image" />
    </section>
</template>

<script lang="ts" setup>
    import ContactSectionAnimateImage from "@/components/animate/ContactSectionAnimateImage.vue";
</script>

<style lang="scss" scoped>
    .contact-section {
        display: grid;
        flex-direction: column;
        align-items: center;
        max-width: 1024px;
        margin: 0 auto 20px auto;
        justify-content: center;
        justify-items: center;
        grid-template-areas: "header" "article" "image";
        position: relative;

        a {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        @media (min-width: 720px) {
            margin: 80px auto;
            justify-content: space-between;
            grid-template-areas: "header header" "article image";
            &__image {
                margin-left: 30px;
            }
        }

        &__header {
            grid-area: header;
            color: #fc4445;
            font-weight: 600;
            font-size: 35px;
            @media (min-width: 420px) {
                font-size: 45px;
            }
        }

        &__image {
            grid-area: image;
            max-width: 400px;
            width: 90%;
            min-width: 200px;
        }

        &__field {
            margin-top: 24px;
        }

        &__label {
            color: #b86060;
            font-size: 12px;
            @media (min-width: 340px) {
                font-size: 15px;
            }
        }

        &__info {
            font-size: 5vw;
            @media (min-width: 420px) {
                font-size: 26px;
            }
            @media (min-width: 520px) {
                font-size: 35px;
            }
            font-weight: 600;
        }

        &__article {
            grid-area: article;
            @media (min-width: 720px) {
            }

            &::before {
                content: "";
                position: absolute;
                width: 160px;
                height: 160px;
                opacity: 0.2;
                z-index: -1;
                background-image: url("@/assets/triangle.svg");
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                transition: all ease-in-out 0.5s;
                @media (min-width: 340px) {
                    width: 230px;
                    height: 190px;
                }
            }
        }
    }
</style>

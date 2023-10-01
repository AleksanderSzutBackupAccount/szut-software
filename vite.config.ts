import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPLugin from "vite-plugin-eslint";
import { dirname, resolve } from "node:path";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import { fileURLToPath } from "node:url";
import babel from "vite-plugin-babel";

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    plugins: [
        vue(),
        eslintPLugin(),
        babel,
        VueI18nPlugin({
            include: resolve(
                dirname(fileURLToPath(import.meta.url)),
                "./src/locales/**"
            ),
            strictMessage: false,
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/styles/_variables.scss";`,
            },
        },
    },
});

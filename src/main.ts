import "./registerServiceWorker";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";
import { GlobalMixin } from "@/mixins/GlobalMixin";
import i18n from "./i18n";

createApp(App).use(i18n).use(router).mixin(GlobalMixin).mount("#app");

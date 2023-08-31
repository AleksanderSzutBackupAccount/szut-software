import "./registerServiceWorker";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/main.scss";
import { GlobalMixin } from "@/mixins/GlobalMixin";

createApp(App).use(router).mixin(GlobalMixin).mount("#app");

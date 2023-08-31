import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/HomeView.vue";
import Technologies from "../views/TechnologiesView.vue";
import AboutUs from "../views/AboutUsView.vue";
import Contact from "../views/ContactView.vue";
import Services from "../views/ServicesView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/about-us",
        name: "about-us",
        component: AboutUs,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
    {
        path: "/services",
        name: "services",
        component: Services,
    },
    {
        path: "/technologies",
        name: "technologies",
        component: Technologies,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

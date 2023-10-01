import HomeView from "@/modules/main/Pages/HomeView.vue";
import AboutUsView from "@/modules/main/Pages/AboutUsView.vue";
import ContactView from "@/modules/main/Pages/ContactView.vue";
import ServicesView from "@/modules/main/Pages/ServicesView.vue";
import TechnologiesView from "@/modules/main/Pages/TechnologiesView.vue";

export default [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about-us",
        name: "about-us",
        component: AboutUsView,
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactView,
    },
    {
        path: "/services",
        name: "services",
        component: ServicesView,
    },
    {
        path: "/technologies",
        name: "technologies",
        component: TechnologiesView,
    },
];

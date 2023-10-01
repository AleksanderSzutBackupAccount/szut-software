import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/modules/main/Layouts/MainLayout.vue";
import MainRouter from "@/modules/main/Router/MainRouter";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "main",
        component: MainLayout,
        children: MainRouter,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

/// <reference types="vite-plugin-pages/client" />
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import routes from "virtual:generated-pages";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/main",
      redirect: "/home",
    },
    {
      path: "/index",
      redirect: "/home",
    },
    ...(routes as RouteRecordRaw[]),
  ],
});

export default router;

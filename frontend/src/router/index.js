import { createRouter, createWebHistory } from "vue-router";
import LogSign from "../views/LogSign.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "LogSign",
    component: LogSign,
  },
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

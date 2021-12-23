import { createRouter, createWebHistory } from "vue-router";
import LogSign from "../views/LogSign.vue";
import HomeView from "../views/HomeView.vue";
import UserSetting from "../views/UserSetting.vue";
import OneView from "../views/OneView.vue";

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
  {
    path: "/setting",
    name: "UserSetting",
    component: UserSetting,
  },
  {
    path: "/edit/:post_id",
    name: "OneView",
    component: OneView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import LogSign from "../views/LogSign.vue";
import HomeView from "../views/HomeView.vue";
import UserSetting from "../views/UserSetting.vue";
import OneView from "../views/OneView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
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
  {
    path: "/profile/:user_id",
    name: "ProfileView",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//regarder la doc
router.beforeEach((to, from, next) => {
  if (to.name == "HomeView" && !localStorage.getItem("user"))
    next({ name: "LogSign" });
  else next();
});

router.beforeEach((to, from, next) => {
  if (to.name == "UserSetting" && !localStorage.getItem("user"))
    next({ name: "LogSign" });
  else next();
});

router.beforeEach((to, from, next) => {
  if (to.name == "ProfileView" && !localStorage.getItem("user"))
    next({ name: "LogSign" });
  else next();
});

export default router;

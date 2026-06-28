import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CountryPage from "../views/CountryPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage,
  },
  {
    name: "country",
    path: "/country/:CName",
    component: CountryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

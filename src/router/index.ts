import { createRouter, createWebHistory } from "vue-router";
import CheckoutPage from "../pages/CheckoutPage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import HomePage from "../pages/HomePage.vue";
import MovieDetailsPage from "../pages/MovieDetailsPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      component: MovieDetailsPage,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: CheckoutPage,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesPage,
    },
  ],
});

export default router;

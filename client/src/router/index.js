import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import ProductDetails from "../views/ProductDetails.vue";
import CategoryPage from "../views/CategoryPage.vue";
import ProductPage from "../views/ProductPage.vue";
import Auth from "../views/Auth.vue";
import Profile from "../views/Profile.vue";
import Favorite from "../views/Favorite.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import Contact from "../views/Contact.vue";
import EditProduct from "../views/EditProduct.vue";
import CreateProduct from "../views/CreateProduct.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/shopping",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/category/:category/:id",
    name: "CategoryPage",
    component: CategoryPage,
  },
  {
    path: "/category/:category/:item/:id",
    name: "ProductPage",
    component: ProductPage,
  },
  {
    path: "/:category/:item/:id",
    name: "ProductDetails",
    component: ProductDetails,
  },
  {
    path: "/edit/:productId",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/category/:category/:item/:id/create",
    name: "CreateProduct",
    component: CreateProduct,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_SERVER_URL),
  routes,
});

export default router;

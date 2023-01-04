import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ProductDetails from '../views/ProductDetails.vue';
import CategoryPage from '../views/CategoryPage.vue';
import ProductPage from '../views/ProductPage.vue';
import Auth from '../views/Auth.vue';
import Favorite from '../views/Favorite.vue';
import UserData from '../components/UserData.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/category/:category/:id',
    name: 'CategoryPage',
    component: CategoryPage,
  },
  {
    path: '/category/:category/:item/:id',
    name: 'ProductPage',
    component: ProductPage,
  },
  {
    path: '/:category/:item/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/contact',
    name: 'UserData',
    component: UserData,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Profile from '../views/ProfileView.vue'
import {auth} from '../firebase' // Assurez-vous que le chemin est correct
import Success from '../views/Success.vue';
import Cancel from '../views/Cancel.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail, name: 'ProductDetail' },
    {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const user = auth.currentUser;
      if (user) {
        next(); // OK : connecté
      } else {
        next('/login'); // redirige vers login s'il n'est pas connecté
      }
    }
  },
  {
  path: '/login',
  name: 'Login',
  component: () => import('../views/LoginView.vue')
},
{
  path: '/profile',
  name: 'Profile',
  component: () => import('../views/ProfileView.vue'),
},
{
  path: '/profile/settings',
  name: 'ProfileSettings',
  component: () => import('../views/Settings.vue'),
},
{
  path: '/about',
  name: 'About',
  component: () => import('../views/AboutView.vue'),
},
  { path: '/success', component: Success },
  { path: '/cancel', component: Cancel },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Profile from '../views/ProfileView.vue'
import {auth} from '../firebase' // Assurez-vous que le chemin est correct

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
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

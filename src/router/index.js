import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Herisson from '../views/Herisson.vue'
import Bonsai from '../views/Bonsai.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/herisson',
    name: 'Herisson',
    component: Herisson
  },
  {
    path: '/bonsai',
    name: 'Bonsai',
    component: Bonsai
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

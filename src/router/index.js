import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Authentication from '@/views/Authentication'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Authentication',
    component: Authentication,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

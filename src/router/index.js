import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Authentication from '@/views/Authentication'
import Categories from '@/views/Categories'
import Clients from '@/views/Clients'
import Providers from '@/views/Providers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentication,
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: Authentication,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
  },
  {
    path: '/providers',
    name: 'Providers',
    component: Providers,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

import Vue from 'vue'
import Home from '@/views/Home'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Authentication'),
    props: { isLogin: true },
    meta: { requiresAuth: false },
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: () => import('@/views/Authentication'),
    meta: { requiresAuth: false },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories'),
    meta: { requiresAuth: true },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/Clients'),
    meta: { requiresAuth: true },
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import('@/views/Providers'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('@/views/Sales'),
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const refreshUser = async (token) => {
  // eslint-disable-next-line global-require
  const store = require('../store').default

  store.dispatch('auth/setToken', token)
  const { data: user } = await store.dispatch('auth/getUser')
  store.dispatch('auth/setUser', user)
}

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')

  if (!token && to.meta.requiresAuth) {
    next('/login')
  } else {
    const shouldRefreshUser = !from.name && to.meta.requiresAuth

    if (shouldRefreshUser) await refreshUser(token)

    next()
  }
})

export default router

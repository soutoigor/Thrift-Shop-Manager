<template>
  <v-app id="app">
    <app-header v-if="!isActualRouteExternal" />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const externalRoutes = [
  '/login',
  '/create-account',
]

export default {
  components: {
    AppHeader: () => import('@/components/AppHeader'),
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    isActualRouteExternal() {
      return externalRoutes.includes(this.$route.path)
    },
  },
  watch: {
    $route: {
      immediate: true,
      async handler(to, from) {
        const LOGIN_PATH = '/login'

        const shouldRefreshUser = from?.path !== LOGIN_PATH
          && !this.isActualRouteExternal

        if (shouldRefreshUser) {
          await this.tryToRefreshUser()
        }
      },
    },
  },
  methods: {
    ...mapActions('auth', [
      'getUser',
      'setUser',
      'setToken',
    ]),
    async tryToRefreshUser() {
      const token = localStorage.getItem('token')
      this.setToken(token)
      const { data: user } = await this.getUser()
      this.setUser(user)
    },
  },
}
</script>

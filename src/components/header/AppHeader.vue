<template>
  <div>
    <v-app-bar
      elevation="1"
      color="white"
      app
    >
      <router-link
        class="logo-link"
        to="/"
      >
        <v-toolbar-title class="toolbar">
            <img
              src="@/assets/logo.png"
              alt="logo"
              class="toolbar__image"
            />
            <span class="toolbar__title">MeuBrechó.com</span>
        </v-toolbar-title>
        </router-link>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      class="secondary"
      :mini-variant="drawer"
      permanent
      dark
      drawer
      app
    >
      <template #prepend>
        <v-list-item @click="toggleDrawer">
          <v-list-item-icon>
            <v-icon>{{ headerIcon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
      </template>
      <v-list>
        <v-list-item
          v-for="item in pages"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <v-divider />
        <v-list-item
          @click="handleLogout"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    drawer: false,
    pages: [
      {
        icon: 'mdi-home',
        title: 'Início',
        url: '/',
      },
      {
        icon: 'mdi-tag',
        title: 'Categorias',
        url: '/categories',
      },
      {
        icon: 'mdi-account-group',
        title: 'Clientes',
        url: '/clients',
      },
      {
        icon: 'mdi-storefront',
        title: 'Fornecedores',
        url: '/providers',
      },
      {
        icon: 'mdi-tshirt-crew',
        title: 'Produtos',
        url: '/products',
      },
      {
        icon: 'mdi-cart',
        title: 'Vendas',
        url: '/sales',
      },
    ],
  }),
  computed: {
    headerIcon() {
      return this.drawer ? 'mdi-menu' : 'mdi-menu-open'
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    handleLogout() {
      this.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="sass" scoped>
.toolbar
  display: flex
  align-items: center
  gap: 2rem
  padding-left: 1rem

.logo-link
  text-decoration: none
  color: currentColor

.toolbar__image
  width: 60px

.toolbar__title
  font-size: 1.7rem

</style>

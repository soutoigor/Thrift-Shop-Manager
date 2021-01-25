<template>
  <v-switch
    color="accent"
    :input-value="isDarkMode"
    :prepend-icon="prependIcon"
    hide-details
    @change="changeTheme"
    @click:prepend="changeTheme(!isDarkMode)"
  />
</template>

<script>
export default {
  computed: {
    isDarkMode() {
      return this.$vuetify.theme.dark
    },
    prependIcon() {
      return this.isDarkMode
        ? 'mdi-moon-waning-crescent'
        : 'mdi-white-balance-sunny'
    },
  },
  created() {
    this.handleSavedTheme()
  },
  methods: {
    changeTheme(value) {
      this.setIsDarkMode(value)
      localStorage.setItem('dark', `${value}`)
    },
    setIsDarkMode(value) {
      this.$vuetify.theme.dark = value
    },
    handleSavedTheme() {
      const theme = localStorage.getItem('dark')
      this.setIsDarkMode(theme === 'true')
    },
  },
}
</script>

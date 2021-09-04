<template>
  <v-row
    class="authentication"
    no-gutters
  >
    <v-col
      cols="12"
      sm="6"
    >
      <v-card
        elevation="12"
        light
        class="authentication__card-form"
      >
        <v-card-title class="card-form__header">
          <img
            src="@/assets/logo.png"
            alt="MeuBrechó Logo"
            class="header__logo"
          />
          <h1 class="header__title">
            MeuBrechó.com
          </h1>
        </v-card-title>
        <v-card-text>
          <v-row class="card-form__container">
            <v-col
              cols="12"
              md="9"
              lg="6"
            >
              <authentication-form
                :is-login="isLogin"
                @error="showError"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <snackbar-alert
      status="error"
      :show="isShowing"
      :message="errorMessage"
      @closeError="closeError"
    />
  </v-row>
</template>

<script>
import AuthenticationForm from '@/components/authentication/AuthenticationForm'

export default {
  components: {
    AuthenticationForm,
    SnackbarAlert: () => import('@/components/common/SnackbarAlert'),
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    errorMessage: '',
    isShowing: false,
  }),
  methods: {
    showError(error) {
      this.errorMessage = error
      this.isShowing = true
    },
    closeError() {
      this.isShowing = false
    },
  },
}
</script>

<style lang="sass" scoped>
.authentication
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  width: 100vw
  background: linear-gradient(90deg, #FFFFFF 50%, rgba(255, 255, 255, 0) 50%), #AC7C00

.authentication__card-form
  display: flex
  flex-direction: column

.card-form__header
  display: flex
  flex-direction: column
  place-items: center
  gap: .7rem

.card-form__container
  display: flex
  justify-content: center

.header__title
  font-size: 2.3rem

.header__logo
  max-width: 100px
</style>

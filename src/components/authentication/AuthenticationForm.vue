<template>
  <v-form @submit.prevent="handleFormSubmit">
    <v-row no-gutters>
      <v-col
        cols="12"
        class="form__title"
      >
        {{ formTitle }}
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-if="!isLogin"
          v-model="name"
          label="Nome do seu brechó"
          outlined
          :error="$v.name.$error"
          clearable
          :error-messages="nameErrors"
          @blur="$v.name.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
          outlined
          clearable
          :error="$v.email.$error"
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="password"
          label="Senha"
          :append-icon="passwordOptions.icon"
          :type="passwordOptions.type"
          clearable
          outlined
          :error="$v.password.$error"
          :error-messages="passwordErrors"
          @blur="$v.password.$touch()"
          @click:append="toggleShowPassword"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="isLoading"
          x-large
        >
          {{ submitButtonText  }}
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        class="form__change-text"
      >
        {{ textChangeFormType }}
      </v-col>
      <v-col cols="12">
        <v-btn
          v-if="isLogin"
          text
          x-large
          block
          color="primary"
          to="/create-account"
        >
          Cadastre-se
        </v-btn>
        <v-btn
          v-else
          text
          x-large
          block
          color="primary"
          to="/login"
        >
          Entrar
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  required,
  requiredIf,
  email,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    name: null,
    email: null,
    password: null,
    showPassword: false,
  }),
  validations() {
    return {
      name: { required: requiredIf(() => !this.isLogin), minLength: minLength(2) },
      email: { required, email },
      password: { required, minLength: minLength(6) },
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoading']),
    passwordOptions() {
      return this.showPassword
        ? { icon: 'mdi-eye', type: 'text' }
        : { icon: 'mdi-eye-off', type: 'password' }
    },
    formTitle() {
      return this.isLogin ? 'Login' : 'Cadastre-se'
    },
    textChangeFormType() {
      return this.isLogin ? 'Não possui uma conta?' : 'Já possui uma conta?'
    },
    submitButtonText() {
      return this.isLogin ? 'Entrar' : 'Criar conta'
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      if (!this.$v.name.minLength) errors.push('Mínimo 2 caracteres')
      if (!this.$v.name.required) errors.push('Preencha o nome')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      if (!this.$v.email.email) errors.push('E-mail inválido')
      if (!this.$v.email.required) errors.push('Preencha o E-mail')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.minLength) errors.push('Mínimo 6 caracteres')
      if (!this.$v.password.required) errors.push('Preencha a senha')
      return errors
    },
  },
  methods: {
    ...mapActions('auth', [
      'login',
      'createAccount',
      'getUser',
      'setUser',
      'setToken',
    ]),
    redirectToHome() {
      this.$router.push('/')
    },
    handleErrorMessage(error) {
      return error === 'unique validation failed on email'
        ? 'E-mail já existente, tente outro ou faça login'
        : 'E-mail ou senha inválidos'
    },
    emitError(error) {
      this.$emit('error', this.handleErrorMessage(error?.response?.data?.message?.[0].message))
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword
    },
    async handleLogin(credentials) {
      const { data: { token } } = await this.login(credentials)
      this.setToken(token)
    },
    async handleFormSubmit() {
      const credentials = {
        email: this.email,
        password: this.password,
      }
      this.$v.$touch()
      if (this.$v.$invalid) return
      try {
        if (!this.isLogin) {
          await this.createAccount({
            ...credentials,
            name: this.name,
          })
        }
        await this.handleLogin(credentials)
        const { data: user } = await this.getUser()
        this.setUser(user)
        this.redirectToHome()
      } catch (error) {
        this.emitError(error)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.form__title
  font-size: 1.5rem
  font-weight: 700
  text-align: center
  margin: 2rem 0

.form__change-text
  font-size: 1.6rem
  font-weight: 400
  text-align: center
  margin: 3rem 0 1rem 0
</style>

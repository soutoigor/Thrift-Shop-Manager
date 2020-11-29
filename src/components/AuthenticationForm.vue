<template>
  <v-form>
    <v-row no-gutters>
      <v-col
        cols="12"
        class="form__title"
      >
        {{ formTitle }}
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="E-mail"
          type="email"
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          label="Senha"
          type="password"
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          color="primary"
          block
          x-large
        >
          Entrar
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
          text
          x-large
          block
          color="primary"
          to="/create-account"
        >
          Cadastre-se
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  computed: {
    formTitle() {
      return 'Login'
    },
    textChangeFormType() {
      return 'Não possui uma conta?'
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

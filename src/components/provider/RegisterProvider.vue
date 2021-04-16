<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="name"
          label="Nome"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="telephone"
          label="Telefone"
          v-mask="['(##) ####-####', '(##) #####-####']"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="contact"
          label="Contato"
          outlined
          hint="E-mail, Instagram, etc"
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="address"
          label="Endereço"
          outlined
          clearable
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          block
          large
          :loading="isLoading"
          :disabled="!hasFilledFields"
        >
          {{ buttonTitle }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    provider: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    name: null,
    contact: null,
    telephone: null,
    address: null,
  }),
  mounted() {
    if (this.hasProvider) {
      this.prepareToEdit()
    }
  },
  computed: {
    ...mapGetters('provider', ['isLoading']),
    hasFilledFields() {
      return !!this.name
      && !!this.contact
      && !!this.address
      && !!this.telephone
    },
    hasProvider() {
      return !!this.provider.id
    },
    buttonTitle() {
      return this.hasProvider ? 'Editar' : 'Criar'
    },
  },
  methods: {
    ...mapActions('provider', [
      'createProvider',
      'updateProvider',
      'listProvider',
    ]),
    prepareToEdit() {
      this.setName(this.provider.name)
      this.setContact(this.provider.contact)
      this.setAddress(this.provider.address)
      this.setTelephone(this.provider.telephone)
    },
    setTelephone(telephone) {
      this.telephone = telephone
    },
    setName(name) {
      this.name = name
    },
    setContact(contact) {
      this.contact = contact
    },
    setAddress(address) {
      this.address = address
    },
    clearFields() {
      this.setName(null)
      this.setContact(null)
      this.setAddress(null)
      this.setTelephone(null)
    },
    onlyNumber(value) {
      return value.replace(/\D/g, '')
    },
    async handleSubmit() {
      const provider = {
        name: this.name,
        contact: this.contact,
        telephone: this.onlyNumber(this.telephone),
        address: this.address,
      }
      if (this.hasProvider) {
        await this.updateProvider({
          id: this.provider.id,
          attributes: provider,
        })
      } else {
        await this.createProvider(provider)
      }
      this.listProvider()
      this.$emit('saved')
      this.clearFields()
    },
  },
}
</script>

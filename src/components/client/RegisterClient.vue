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
          v-model="contact"
          label="Contato"
          outlined
          hint="E-mail, telefone, etc"
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
    client: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data: () => ({
    name: null,
    contact: null,
    address: null,
  }),
  mounted() {
    if (this.hasClient) {
      this.prepareToEdit()
    }
  },
  computed: {
    ...mapGetters('client', ['isLoading']),
    hasFilledFields() {
      return !!this.name && !!this.contact && !!this.address
    },
    hasClient() {
      return !!this.client.id
    },
    buttonTitle() {
      return this.hasClient ? 'Editar' : 'Criar'
    },
  },
  methods: {
    ...mapActions('client', [
      'createClient',
      'updateClient',
    ]),
    prepareToEdit() {
      this.setName(this.client.name)
      this.setContact(this.client.contact)
      this.setAddress(this.client.address)
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
    async handleSubmit() {
      const client = {
        name: this.name,
        contact: this.contact,
        address: this.address,
      }
      if (this.hasClient) {
        await this.updateClient({
          id: this.client.id,
          attributes: client,
        })
      } else {
        await this.createClient(client)
      }
      this.$emit('created')
      this.setName(null)
    },
  },
}
</script>

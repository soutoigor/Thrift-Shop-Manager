<template>
  <v-row
    class="client"
    no-gutters
  >
    <v-col
      cols="12"
      sm="8"
    >
      <h1 class="client__title">Clientes</h1>
    </v-col>
    <v-col
      cols="12"
      sm="4"
    >
      <v-btn
        color="primary"
        large
        block
        @click="openDialog"
      >
        Cadastrar cliente
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="client__list"
    >
      <list-clients />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      @close="closeDialog"
      width="30vw"
    >
      <template #title>
        Cadastrar cliente
      </template>
      <template #content>
        <register-client
          v-if="isDialogOpen"
          @saved="handleClientCreation"
        />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterClient: () => import('@/components/client/RegisterClient'),
    ListClients: () => import('@/components/client/ListClients'),
  },
  data: () => ({
    isDialogOpen: false,
  }),
  created() {
    this.listClient()
  },
  methods: {
    ...mapActions('client', ['listClient']),
    handleClientCreation() {
      this.closeDialog()
    },
    openDialog() {
      this.isDialogOpen = true
    },
    closeDialog() {
      this.isDialogOpen = false
    },
  },
}
</script>

<style lang="sass" scoped>
.client
  display: flex
  align-items: center

.client__title
  font-size: 4rem
  font-weight: 300

.client__list
  margin-top: 3rem

</style>

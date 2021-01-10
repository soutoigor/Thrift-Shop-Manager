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
      <v-progress-circular
        v-if="firstLoad"
        indeterminate
        color="primary"
        size="40"
      />
      <list-clients
        v-else
        :clients="clients"
      />
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
        <register-client @created="handleClientCreation" />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterClient: () => import('@/components/client/RegisterClient'),
    ListClients: () => import('@/components/client/ListClients'),
  },
  data: () => ({
    isDialogOpen: false,
    firstLoad: false,
  }),
  created() {
    this.handleFirstLoad()
  },
  computed: {
    ...mapGetters('client', ['clients']),
  },
  methods: {
    ...mapActions('client', ['listClient']),
    async handleClientCreation() {
      await this.listClient()
      this.closeDialog()
    },
    async handleFirstLoad() {
      this.toggleFirstLoad()
      await this.listClient()
      this.toggleFirstLoad()
    },
    toggleFirstLoad() {
      this.firstLoad = !this.firstLoad
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

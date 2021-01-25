<template>
  <v-row
    class="provider"
    no-gutters
  >
    <v-col
      cols="12"
      sm="8"
    >
      <h1 class="provider__title">Fornecedores</h1>
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
        Cadastrar fornecedor
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="provider__list"
    >
      <list-providers />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      @close="closeDialog"
      width="30vw"
    >
      <template #title>
        Cadastrar fornecedor
      </template>
      <template #content>
        <register-provider @created="handleProviderCreation" />
      </template>
    </popup-modal>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterProvider: () => import('@/components/provider/RegisterProvider'),
    ListProviders: () => import('@/components/provider/ListProviders'),
  },
  data: () => ({
    isDialogOpen: false,
    firstLoad: false,
  }),
  created() {
    this.listProvider()
  },
  methods: {
    ...mapActions('provider', ['listProvider']),
    async handleProviderCreation() {
      await this.listProvider()
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
@import '~vuetify/src/styles/styles.sass'

.provider
  display: flex
  align-items: center

.provider__title
  font-size: 4rem
  font-weight: 300
  @media #{map-get($display-breakpoints, 'xs-only')}
    font-size: 3rem

.provider__list
  margin-top: 3rem

</style>

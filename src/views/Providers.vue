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
      <v-progress-circular
        v-if="firstLoad"
        indeterminate
        color="primary"
        size="40"
      />
      <list-providers
        v-else
        :providers="providers"
      />
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
import { mapActions, mapGetters } from 'vuex'

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
    this.handleFirstLoad()
  },
  computed: {
    ...mapGetters('provider', ['providers']),
  },
  methods: {
    ...mapActions('provider', ['listProvider']),
    async handleProviderCreation() {
      await this.listProvider()
      this.closeDialog()
    },
    async handleFirstLoad() {
      this.toggleFirstLoad()
      await this.listProvider()
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
  display: flex
  justify-content: center
  margin-top: 3rem
  padding: 2rem

</style>

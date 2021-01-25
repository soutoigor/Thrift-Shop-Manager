<template>
  <v-row
    class="sale"
    no-gutters
  >
    <v-col
      cols="12"
      sm="8"
    >
      <h1 class="sale__title">Vendas</h1>
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
        Cadastrar venda
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="sale__list"
    >
      <list-sale />
    </v-col>
    <popup-modal
      :open="isDialogOpen"
      @close="closeDialog"
      width="50vw"
    >
      <template #title>
        Cadastrar venda
      </template>
      <template #content>
        <register-sale
          v-if="isDialogOpen"
          @created="handleSaleCreation"
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
    RegisterSale: () => import('@/components/sale/RegisterSale'),
    ListSale: () => import('@/components/sale/ListSale'),
  },
  data: () => ({
    isDialogOpen: false,
  }),
  created() {
    this.listSales()
    this.listClient()
    this.listProducts()
    this.listProviders()
    this.listCategory()
  },
  methods: {
    ...mapActions({
      listSales: 'sale/listSales',
      listClient: 'client/listClient',
      listProducts: 'product/listProducts',
      listProviders: 'provider/listProvider',
      listCategory: 'category/listCategory',
    }),
    async handleSaleCreation() {
      await this.listSales()
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
.sale
  display: flex
  align-items: center

.sale__title
  font-size: 4rem
  font-weight: 300

.sale__list
  margin-top: 3rem
</style>

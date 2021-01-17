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
      <v-progress-circular
        v-if="firstLoad"
        indeterminate
        color="primary"
        size="40"
      />
      <v-row v-else>
        <v-col cols="12">
          <v-expansion-panels v-if="$vuetify.breakpoint.smAndDown">
            <v-expansion-panel>
              <v-expansion-panel-header disable-icon-rotate>
                Filtrar vendas
                <template #actions>
                  <v-icon>mdi-filter</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <filter-sale />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <filter-sale v-else />
        </v-col>
        <v-col cols="12">
          <list-sale
            :sales="sales"
          />
        </v-col>
      </v-row>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    PopupModal: () => import('@/components/common/PopupModal'),
    RegisterSale: () => import('@/components/sale/RegisterSale'),
    ListSale: () => import('@/components/sale/ListSale'),
    FilterSale: () => import('@/components/sale/FilterSale'),
  },
  data: () => ({
    isDialogOpen: false,
    firstLoad: false,
  }),
  created() {
    this.handleFirstLoad()
    this.listClient()
    this.listProducts()
    this.listProviders()
    this.listCategory()
  },
  computed: {
    ...mapGetters('sale', ['sales']),
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
    async handleFirstLoad() {
      this.toggleFirstLoad()
      await this.listSales()
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
.sale
  display: flex
  align-items: center

.sale__title
  font-size: 4rem
  font-weight: 300

.sale__list
  margin-top: 3rem
</style>

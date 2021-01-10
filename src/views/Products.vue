<template>
  <v-row
    class="product"
    no-gutters
  >
    <v-col
      cols="12"
      sm="8"
    >
      <h1 class="product__title">Produtos</h1>
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
        Cadastrar produto
      </v-btn>
    </v-col>
    <v-col
      cols="12"
      class="product__list"
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
                Filtrar produtos
                <template #actions>
                  <v-icon>mdi-filter</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <filter-product />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <filter-product v-else />
        </v-col>
        <v-col cols="12">
          <list-product
            :products="products"
          />
        </v-col>
      </v-row>
    </v-col>
    <full-screen-modal
      :open="isDialogOpen"
      @close="closeDialog"
      width="30vw"
    >
      <template #title>
        Criar produto
      </template>
      <template #content>
        <register-product
          v-if="isDialogOpen"
          @created="handleProductCreation"
        />
      </template>
    </full-screen-modal>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    FullScreenModal: () => import('@/components/common/FullScreenModal'),
    RegisterProduct: () => import('@/components/product/RegisterProduct'),
    ListProduct: () => import('@/components/product/ListProduct'),
    FilterProduct: () => import('@/components/product/FilterProduct'),
  },
  data: () => ({
    isDialogOpen: false,
    firstLoad: false,
  }),
  created() {
    this.handleFirstLoad()
  },
  computed: {
    ...mapGetters('product', ['products']),
  },
  methods: {
    ...mapActions('product', ['listProducts']),
    async handleProductCreation() {
      await this.listProducts()
      this.closeDialog()
    },
    async handleFirstLoad() {
      this.toggleFirstLoad()
      await this.listProducts()
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
.product
  display: flex
  align-items: center

.product__title
  font-size: 4rem
  font-weight: 300

.product__list
  margin-top: 3rem
</style>

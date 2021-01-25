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
      <v-col cols="12">
        <list-product />
      </v-col>
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
import { mapActions } from 'vuex'

export default {
  components: {
    FullScreenModal: () => import('@/components/common/FullScreenModal'),
    RegisterProduct: () => import('@/components/product/RegisterProduct'),
    ListProduct: () => import('@/components/product/ListProduct'),
  },
  data: () => ({
    isDialogOpen: false,
  }),
  created() {
    this.listProducts()
    this.listCategory()
    this.listProvider()
  },
  methods: {
    ...mapActions({
      listProducts: 'product/listProducts',
      listCategory: 'category/listCategory',
      listProvider: 'provider/listProvider',
    }),
    async handleProductCreation() {
      await this.listProducts()
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
.product
  display: flex
  align-items: center

.product__title
  font-size: 4rem
  font-weight: 300

.product__list
  margin-top: 3rem
</style>

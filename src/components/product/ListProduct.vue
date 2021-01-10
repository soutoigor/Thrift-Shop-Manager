<template>
  <fragment>
    <v-row v-if="hasProducts">
      <v-data-table
        v-if="$vuetify.breakpoint.mdAndUp"
        class="products"
        :headers="headers"
        :items="products"
        hide-default-footer
        :page="pages.page"
        :items-per-page="pages.perPage"
      >
        <template #item="{ item }">
          <tr>
            <item-product :product="item" />
          </tr>
        </template>
      </v-data-table>
      <v-row v-else>
        <v-col
          v-for="product of products"
          :key="product.id"
          cols="12"
        >
          <item-product :product="product" />
        </v-col>
      </v-row>
      <v-pagination
        class="pagination"
        :value="pages.page"
        :length="pages.totalPages"
        @input="changePage"
      />
    </v-row>
    <v-row v-else>
      <v-col
        class="products__empty"
        cols="12"
      >
        Não há produtos.
      </v-col>
    </v-row>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { mapActions, mapGetters } from 'vuex'
import ItemProduct from '@/components/product/ItemProduct'

export default {
  components: {
    ItemProduct,
    Fragment,
  },
  props: {
    products: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: '',
        value: '',
      },
      {
        text: 'Descrição',
        value: 'name',
      },
      {
        text: 'Data de compra',
        value: 'newItem.date',
      },
      {
        text: 'Preço de compra',
        value: 'newItem.buy_price',
      },
      {
        text: 'Preço para venda',
        value: 'price',
      },
      {
        text: 'Categoria',
        value: 'category.name',
      },
      {
        text: 'Fornecedor',
        value: 'newItem.provider.name',
      },
      {
        text: 'Ações',
        value: '',
      },
    ],
  }),
  computed: {
    ...mapGetters('product', ['pages']),
    hasProducts() {
      return this.products.length > 0
    },
  },
  methods: {
    ...mapActions('product', [
      'setFilter',
      'listProducts',
    ]),
    changePage(page) {
      this.setFilter({ page })
      this.listProducts()
    },
  },
}
</script>

<style lang="sass" scoped>
.products
  width: 100%

.pagination
  width: 100%
  margin-top: 2rem

.products__empty
  font-size: 3rem
  text-align: center

</style>

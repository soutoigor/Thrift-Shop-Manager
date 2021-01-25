<template>
  <v-row>
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
    <v-col
      v-if="isLoading"
      class="products__loading"
      cols="12"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
    </v-col>
    <v-col
      v-else
      cols="12"
    >
      <v-row v-if="hasProducts">
        <v-col cols="12">
          <v-row v-if="$vuetify.breakpoint.xs">
            <v-col
              v-for="product of products"
              :key="product.id"
              cols="12"
            >
              <item-product :product="product" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-data-table
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
              <v-pagination
                :value="pages.page"
                :length="pages.totalPages"
                @input="changePage"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          class="products__empty"
          cols="12"
        >
          Não há produtos.
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ItemProduct: () => import('@/components/product/ItemProduct'),
    FilterProduct: () => import('@/components/product/FilterProduct'),
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
    ...mapGetters('product', [
      'pages',
      'products',
      'isLoading',
    ]),
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

.products__loading
  display: flex
  justify-content: center

.pagination
  width: 100%
  margin-top: 2rem

.products__empty
  font-size: 3rem
  text-align: center

</style>

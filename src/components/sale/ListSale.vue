<template>
  <fragment>
    <v-row v-if="hasSales">
      <v-data-table
        v-if="$vuetify.breakpoint.mdAndUp"
        class="sales"
        :headers="headers"
        :items="sales"
        item-key="id"
        hide-default-footer
        show-expand
        single-expand
        :expanded.sync="expanded"
        :page="pages.page"
        :items-per-page="pages.perPage"
      >
        <template #item="{ item, expand, isExpanded }">
          <tr>
            <item-sale :sale="item" />
            <td>
              <v-icon
                text
                color="secondary"
                @click="expand(!isExpanded)"
              >
                {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
              </v-icon>
            </td>
          </tr>
        </template>
        <template #expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <sold-product
              v-for="product of item.itemSell"
              :key="product.id"
              :product="product.item"
            />
          </td>
        </template>
      </v-data-table>
      <v-row v-else>
        <v-col
          v-for="sale of sales"
          :key="sale.id"
          cols="12"
        >
          <item-sale :sale="sale" />
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
        class="sales__empty"
        cols="12"
      >
        Não há vendas.
      </v-col>
    </v-row>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { mapActions, mapGetters } from 'vuex'
import ItemSale from '@/components/sale/ItemSale'

export default {
  components: {
    ItemSale,
    Fragment,
    SoldProduct: () => import('@/components/sale/SoldProduct'),
  },
  props: {
    sales: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data: () => ({
    expanded: [],
    headers: [
      {
        text: 'Data de venda',
        value: 'date',
      },
      {
        text: 'Frete',
        value: 'shipping_price',
      },
      {
        text: 'Cliente',
        value: 'client.name',
      },
      {
        text: 'Contato cliente',
        value: 'client.contact',
      },
      {
        text: 'Preço da venda',
        value: '',
      },
      {
        text: 'Ações',
        value: '',
        sortable: false,
      },
      {
        text: '',
        value: 'data-table-expand',
      },
    ],
  }),
  computed: {
    ...mapGetters('sale', ['pages']),
    hasSales() {
      return this.sales.length > 0
    },
  },
  methods: {
    ...mapActions('sale', [
      'setFilter',
      'listSales',
    ]),
    changePage(page) {
      this.setFilter({ page })
      this.listSales()
    },
  },
}
</script>

<style lang="sass" scoped>
.sales
  width: 100%

.pagination
  width: 100%
  margin-top: 2rem

.sales__empty
  font-size: 3rem
  text-align: center

</style>

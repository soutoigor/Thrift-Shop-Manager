<template>
  <v-row>
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
    <v-col
      v-if="isLoading"
      class="sales__loading"
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
      <v-row v-if="hasSales">
        <v-col cols="12">
          <v-row v-if="$vuetify.breakpoint.xs">
            <v-col
              v-for="sale of sales"
              :key="sale.id"
              cols="12"
            >
              <item-sale :sale="sale" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-data-table
                v-if="$vuetify.breakpoint.mdAndUp"
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
          class="sales__empty"
          cols="12"
        >
          Não há vendas.
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ItemSale: () => import('@/components/sale/ItemSale'),
    SoldProduct: () => import('@/components/sale/SoldProduct'),
    FilterSale: () => import('@/components/sale/FilterSale'),
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
    ...mapGetters('sale', [
      'pages',
      'isLoading',
      'sales',
    ]),
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

.sales__loading
  display: flex
  justify-content: center

.sales__empty
  font-size: 3rem
  text-align: center

</style>

<template>
  <v-row :no-gutters="$vuetify.breakpoint.smAndDown">
    <v-col
      cols="12"
      md="3"
    >
      <v-autocomplete
        v-model="filter.client_id"
        :items="clients"
        label="Cliente"
        item-text="name"
        item-value="id"
        :loading="isLoadingClients"
        outlined
        clearable
        @change="filterSales"
      />
    </v-col>
    <v-col
      cols="12"
      md="3"
    >
      <v-autocomplete
        v-model="filter.item_id"
        :items="soldProducts"
        label="Produto"
        item-text="name"
        item-value="id"
        :loading="isLoadingProducts"
        outlined
        clearable
        @change="filterSales"
      />
    </v-col>
    <v-col
      cols="12"
      md="3"
    >
      <v-autocomplete
        v-model="filter.category_id"
        :items="categories"
        label="Categoria"
        item-text="name"
        item-value="id"
        :loading="isLoadingCategories"
        outlined
        clearable
        @change="filterSales"
      />
    </v-col>
    <v-col
      cols="12"
      md="3"
    >
      <v-autocomplete
        v-model="filter.provider_id"
        :items="providers"
        label="Fornecedor"
        item-text="name"
        item-value="id"
        :loading="isLoadingProviders"
        outlined
        clearable
        @change="filterSales"
      />
    </v-col>

    <v-col
      cols="12"
      md="3"
    >
      <v-menu
        v-model="dateMenu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto"
      >
        <template #activator="{ on }">
          <v-text-field
            :value="dateFormatted"
            label="Data de inclusão"
            readonly
            outlined
            append-icon="mdi-calendar"
            v-on="on"
            clearable
            @click:clear="clearDates"
          />
        </template>
        <v-date-picker
          v-model="dates"
          no-title
          range
          color="secondary"
          @input="filterSales"
        />
      </v-menu>
    </v-col>
    <v-col
      cols="12"
      md="9"
    >
      <v-range-slider
        v-model="priceRange"
        min="0"
        max="1000"
        thumb-label="always"
        thumb-size="45"
        :vertical="$vuetify.breakpoint.xs"
        label="Valor de venda"
        @change="filterSales"
      >
        <template #thumb-label="{ value }">
          {{ value }}
        </template>
      </v-range-slider>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'

export default {
  mixins: [dates],
  data: () => ({
    filter: {},
    dateMenu: false,
    dates: [],
    priceRange: [0, 1000],
  }),
  computed: {
    ...mapGetters({
      categories: 'category/categories',
      providers: 'provider/providers',
      soldProducts: 'product/soldProducts',
      clients: 'client/clients',
      isLoadingCategories: 'category/isLoading',
      isLoadingProviders: 'provider/isLoading',
      isLoadingProducts: 'product/isLoading',
      isLoadingClients: 'client/isLoading',
    }),
    dateFormatted() {
      return this.dateRange(this.dates)
    },
  },
  created() {
    this.listSoldProducts()
  },
  methods: {
    ...mapActions({
      setFilter: 'sale/setFilter',
      listSales: 'sale/listSales',
      listSoldProducts: 'product/listSoldProducts',
    }),
    clearDates() {
      this.dates = []
      this.filterSales()
    },
    closeDateMenu() {
      this.dateMenu = false
    },
    sortPrices(prices) {
      return prices.sort((a, b) => a - b)
    },
    filterSales() {
      const [start_date, end_date] = this.sortDates(this.dates)
      const [start_price, end_price] = this.sortPrices(this.priceRange)
      const filter = {
        ...this.filter,
        start_date,
        end_date,
        start_price,
        end_price,
      }

      this.setFilter(filter)
      this.listSales()
    },
  },
}
</script>

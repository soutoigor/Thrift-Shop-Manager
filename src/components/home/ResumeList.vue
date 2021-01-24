<template>
  <v-container
    fluid
    fill-height
    class="resume-list"
  >
    <v-row
      class="resume-list__quantity-items"
    >
      <v-col
        v-for="({ title, quantity, loading }) of quantityItems"
        :key="title"
        cols="12"
        md="4"
      >
        <resume-card :loading="loading">
          <template #title>{{ title }}</template>
          <template #content>{{ quantity }}</template>
        </resume-card>
      </v-col>
    </v-row>
    <v-row
      class="resume-list__money-items"
    >
      <v-col
        v-for="({ title, money, loading }) of moneyItems"
        :key="title"
        cols="12"
        md="4"
      >
        <resume-card :loading="loading">
          <template #title>{{ title }}</template>
          <template #content>
            <span :class="{
              'resume-list__money--negative': money < 0,
              'resume-list__money--positive': money >= 0,
            }">
              {{ money | currencyBRL }}
            </span>
          </template>
        </resume-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import dates from '@/mixins/dates'

export default {
  name: 'ResumeList',
  components: {
    ResumeCard: () => import('@/components/home/ResumeCard'),
  },
  mixins: [dates],
  data: () => ({
    isLoadingMonthProfit: true,
    isLoadingTotalProfit: true,
    totalProfit: 0,
    monthProfit: 0,
  }),
  created() {
    this.buildTotalProfit()
    this.listProducts()
    this.listClient()
    this.listSales()
  },
  computed: {
    ...mapGetters({
      totalClients: 'client/totalClients',
      totalProducts: 'product/totalProducts',
      totalSells: 'sale/totalSells',
      isLoadingClients: 'client/isLoading',
      isLoadingProducts: 'product/isLoading',
      isLoadingSales: 'sale/isLoading',
    }),
    isLoadingProductsData() {
      return this.isLoadingProducts || this.isLoadingSales
    },
    moneyItems() {
      return [
        {
          title: 'Lucro no mês',
          money: this.monthProfit,
          loading: this.isLoadingMonthProfit,
        },
        {
          title: 'Lucro até hoje',
          money: this.totalProfit,
          loading: this.isLoadingTotalProfit,
        },
      ]
    },
    quantityItems() {
      return [
        {
          title: 'Número de vendas',
          quantity: this.totalSells,
          loading: this.isLoadingSales,
        },
        {
          title: 'Produtos em estoque',
          quantity: this.totalProducts,
          loading: this.isLoadingProducts,
        },
        {
          title: 'Clientes',
          quantity: this.totalClients,
          loading: this.isLoadingClients,
        },
      ]
    },
  },
  methods: {
    ...mapActions({
      listProducts: 'product/listProducts',
      listClient: 'client/listClient',
      listSales: 'sale/listSales',
      totalSale: 'sale/totalSale',
    }),
    setMonthTotalProfit(profit) {
      this.monthProfit = profit
    },
    setTotalProfit(profit) {
      this.totalProfit = profit
    },
    toggleIsLoadingMonthProfit() {
      this.isLoadingMonthProfit = !this.isLoadingMonthProfit
    },
    toggleIsLoadingTotalProfit() {
      this.isLoadingTotalProfit = !this.isLoadingTotalProfit
    },
    getLastMonthRange() {
      return {
        start_date: this.startOfMonth(),
        end_date: this.dateNowISO(),
      }
    },
    buildTotalProfit() {
      this.totalSale()
        .then(this.setTotalProfit)
        .finally(this.toggleIsLoadingTotalProfit)

      this.totalSale(this.getLastMonthRange())
        .then(this.setMonthTotalProfit)
        .then(this.toggleIsLoadingMonthProfit)
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~vuetify/src/styles/styles.sass'

.resume-list
  height: 100%
  gap: 5rem
  @media #{map-get($display-breakpoints, 'sm-and-down')}
    gap: 0

.resume-list__quantity-items
  flex: 1
  display: flex
  justify-content: space-between

.resume-list__money-items
  flex: 1
  display: flex
  justify-content: space-around

.resume-list__money--positive
  color: var(--v-success-darken2)

.resume-list__money--negative
  color: var(--v-error-darken2)

</style>

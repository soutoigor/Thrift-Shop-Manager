/*eslint-disable*/
import {
  index,
  store,
  update,
  destroy,
  getTotal,
} from '@/api/sale'

export default {
  namespaced: true,
  state: {
    loading: false,
    sales: [],
    filter: {
      page: 1,
    },
    pages: {},
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_SALES(state, payload) {
      state.sales = [...payload]
    },
    SET_PAGES(state, payload) {
      state.pages = { ...payload }
    },
    SET_FILTER(state, payload) {
      state.filter = { ...payload }
    },
  },
  actions: {
    createSale({ commit }, attributes) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        store(attributes)
          .then(({ data }) => resolve(data))
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    listSales({ commit, state }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index(state.filter)
          .then(({ data: { sales, pages } }) => {
            commit('SET_SALES', sales)
            commit('SET_PAGES', pages)
            resolve(sales)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    updateSale({ commit }, { id, attributes }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        update(id, attributes)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    deleteSale({ commit }, id) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    totalSale(_, dateRange = {}) {
      return new Promise((resolve, reject) => {
        getTotal(dateRange)
          .then(({ data: { total } }) => resolve(total))
          .catch(reject)
      })
    },
    setFilter({ commit, state }, filter) {
      const validFilters = Object.fromEntries(
        Object
          .entries({ ...state.filter, ...filter })
          .filter(
            ([, value]) => value !== null && value !== undefined && value !== '',
          ),
      )
      commit('SET_FILTER', validFilters)
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    sales: (state) => state.sales,
    pages: ({ pages }) => ({
      ...pages,
      totalPages: Math.ceil(+pages.total / pages.perPage),
    }),
    totalSells: (state) => state.pages.total,
  },
}

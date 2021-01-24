import {
  index,
  store,
  update,
  destroy,
} from '@/api/product'

export default {
  namespaced: true,
  state: {
    loading: false,
    products: [],
    filter: {
      page: 1,
      sold: false,
    },
    pages: {},
    soldProducts: [],
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_PRODUCTS(state, payload) {
      state.products = [...payload]
    },
    SET_SOLD_PRODUCTS(state, payload) {
      state.soldProducts = [...payload]
    },
    SET_PAGES(state, payload) {
      state.pages = { ...payload }
    },
    SET_FILTER(state, payload) {
      state.filter = { ...payload }
    },
  },
  actions: {
    createProduct({ commit }, attributes) {
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
    listProducts({ commit, state }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index(state.filter)
          .then(({ data: { products } }) => {
            commit('SET_PRODUCTS', products.items)
            commit('SET_PAGES', products.pages)
            resolve(products)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    listSoldProducts({ commit }) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index({ sold: true })
          .then(({ data: { products } }) => {
            commit('SET_SOLD_PRODUCTS', products.items)
            resolve(products)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    updateProduct({ commit }, { id, attributes }) {
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
    deleteProduct({ commit }, id) {
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
    setFilter({ commit, state }, filter) {
      const validFilters = Object.fromEntries(
        Object
          .entries({ ...state.filter, ...filter })
          .filter(([, value]) => !!value),
      )
      commit('SET_FILTER', validFilters)
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    products: (state) => state.products,
    soldProducts: (state) => state.soldProducts,
    pages: ({ pages }) => ({
      ...pages,
      totalPages: Math.ceil(+pages.total / pages.perPage),
    }),
    totalProducts: (state) => state.pages.total,
  },
}

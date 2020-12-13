import {
  index,
  store,
  update,
  destroy,
} from '@/api/provider'

export default {
  namespaced: true,
  state: {
    loading: false,
    providers: [],
    filter: null,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_PROVIDERS(state, payload) {
      state.providers = [...payload]
    },
    SET_FILTER(state, payload) {
      state.filter = payload
    },
  },
  actions: {
    createProvider({ commit }, attributes) {
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
    listProvider({ commit }, filters = {}) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        index(filters)
          .then(({ data: { providers } }) => {
            commit('SET_PROVIDERS', providers)
            resolve(providers)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    updateProvider({ commit }, { id, attributes }) {
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
    deleteProvider({ commit }, id) {
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
    setFilter({ commit }, filter) {
      commit('SET_FILTER', filter)
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    providers: (state) => (state.filter
      ? state.providers.filter(
        (provider) => provider.name.toLowerCase().includes(state.filter.toLowerCase()),
      )
      : state.providers),
  },
}

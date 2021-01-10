import {
  store,
  show,
} from '@/api/upload'

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    createImage({ commit }, file) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        store(file)
          .then(({ data }) => resolve(data))
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
    getImage({ commit }, fileName) {
      commit('SET_LOADING', true)
      return new Promise((resolve, reject) => {
        show(fileName)
          .then(({ data: { file } }) => {
            resolve(file)
          })
          .catch(reject)
          .finally(() => {
            commit('SET_LOADING', false)
          })
      })
    },
  },
  getters: {
    isLoading: (state) => state.loading,
  },
}

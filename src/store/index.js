import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/authentication'
import category from '@/store/modules/category'
import client from '@/store/modules/client'
import provider from '@/store/modules/provider'
import product from '@/store/modules/product'
import upload from '@/store/modules/upload'
import sale from '@/store/modules/sale'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    auth,
    category,
    client,
    provider,
    product,
    upload,
    sale,
  },
})

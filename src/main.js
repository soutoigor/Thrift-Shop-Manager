import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import Vuelidate from 'vuelidate'
import vuetify from '@/plugins/vuetify'
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'
import VueTheMask from 'vue-the-mask'
import '@/utils/filters'

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.use(VueTheMask)

Vue.component('v-text-field', VTextField)

Vue.use(VCurrencyField, {
  locale: 'pt-BR',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0,
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

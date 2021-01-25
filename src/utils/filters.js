import Vue from 'vue'
import {
  format,
} from 'date-fns'

Vue.filter('formatDate', (date) => {
  if (!date) return ''
  return format(new Date(date), 'dd/MM/yyyy')
})

Vue.filter('trimStringBy', (string, maxLength) => {
  if (!string) return ''
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}...`
    : string
})

Vue.filter('currencyBRL', (money) => money.toLocaleString(
  'pt-BR',
  {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  },
))

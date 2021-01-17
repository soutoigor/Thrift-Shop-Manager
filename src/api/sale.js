import axios from '@/plugins/axios'

export const store = (attributes) => axios
  .post('/sell', attributes)

export const index = (params) => axios.get('/sell', { params })

export const update = (id, attributes) => axios.patch(`/sell/${id}`, attributes)

export const destroy = (id) => axios.delete(`/sell/${id}`)

export default {
  index,
  store,
  update,
  destroy,
}

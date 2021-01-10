import axios from '@/plugins/axios'

export const store = (attributes) => axios
  .post('/item', attributes)

export const index = (params) => axios.get('/item', { params })

export const update = (id, attributes) => axios.patch(`/item/${id}`, attributes)

export const destroy = (id) => axios.delete(`/item/${id}`)

export default {
  index,
  store,
  update,
  destroy,
}

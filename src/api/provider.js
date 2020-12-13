import axios from '@/plugins/axios'

export const store = (attributes) => axios
  .post('/provider', attributes)

export const index = (params) => axios.get('/provider', { params })

export const update = (id, attributes) => axios.patch(`/provider/${id}`, attributes)

export const destroy = (id) => axios.delete(`/provider/${id}`)

export default {
  index,
  store,
  update,
  destroy,
}

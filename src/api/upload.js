import axios from '@/plugins/axios'

export const store = (attributes) => axios.post(
  '/upload',
  attributes,
  {
    headers: {
      'content-type': 'multipart/form-data',
    },
  },
)

export const show = (id) => axios.get(`/upload/${id}`)

export default {
  store,
  show,
}

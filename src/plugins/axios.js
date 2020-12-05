import axios from 'axios'

const axiosSettings = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 30000,
})

export default axiosSettings

import axios from 'axios'

const axiosSettings = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 30000,
})

axiosSettings.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRoute = error.response.config.url === '/login'
    const isUnauthorized = error.response.status === 401

    if (isUnauthorized && !isLoginRoute) {
      window.location = '/login'
    }

    return Promise.reject(error)
  },
)

export default axiosSettings

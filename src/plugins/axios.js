import axios from 'axios'

const axiosSettings = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 30000,
})

axiosSettings.interceptors.response.use(
  (response) => response,
  (error) => {
    const urlAPIRequested = error.response.config.url.replace(error.response.config.baseURL, '')
    const isSessionRoute = urlAPIRequested === '/user'
    if (error.response.status === 401 && !isSessionRoute) {
      window.location = '/login'
    }
    return Promise.reject(error)
  },
)

export default axiosSettings

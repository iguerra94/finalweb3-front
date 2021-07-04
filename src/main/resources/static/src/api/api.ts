import Axios from 'axios'
import { LS_KEYS } from 'src/hooks/useLocalStorage'

import auth from './auth'
import { API_URL_LOGIN } from './auth/routes'
import user from './user'

// Setup request interceptor
Axios.interceptors.request.use(
  (config) => {
    if (config.url !== API_URL_LOGIN) {
      // Add auth token to request headers
      config.headers['Authorization'] = `Bearer ${localStorage.getItem(
        LS_KEYS.AUTH_TOKEN
      )}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const api = {
  auth,
  user
}

export default api

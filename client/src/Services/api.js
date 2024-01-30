import Axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default Client

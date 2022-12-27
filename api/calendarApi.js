import axios from 'axios'
import { getEnvVariables } from '../src/helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
})

//TODO: Configurar Interceptores
calendarApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token'),
  }

  return config
})

export default calendarApi

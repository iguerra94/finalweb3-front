import { API_BASE_URL } from 'src/api/routes'

export const API_URL_TRUCK = (id: number | string = '') =>
  `${API_BASE_URL}/camiones${id ? `/${id}` : ''}`

import { API_BASE_URL } from 'src/api/routes'

export const API_URL_ORDER = (id: number | string = '') =>
  `${API_BASE_URL}/ordenes${id ? `/${id}` : ''}`

import { API_BASE_URL } from 'src/api/routes'

export const API_URL_PRODUCT = (id: number | string = '') =>
  `${API_BASE_URL}/productos${id ? `/${id}` : ''}`

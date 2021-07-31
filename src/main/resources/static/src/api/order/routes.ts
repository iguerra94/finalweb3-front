import { API_BASE_URL } from 'src/api/routes'

export const API_URL_ORDER = (id: number | string = '') =>
  `${API_BASE_URL}/ordenes${id ? `/${id}` : ''}`

export const API_URL_ORDER_INITIAL_WEIGHING = `${API_URL_ORDER()}/pesajeInicial`
export const API_URL_ORDER_FINAL_WEIGHING = `${API_URL_ORDER()}/pesajeFinal`

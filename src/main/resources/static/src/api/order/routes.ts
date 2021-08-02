import { API_BASE_URL } from 'src/api/routes'

export const API_URL_ORDER = (id: number | string = '') =>
  `${API_BASE_URL}/ordenes${id ? `/${id}` : ''}`

export const API_URL_ORDER_INITIAL_WEIGHING = `${API_URL_ORDER()}/pesajeInicial`
export const API_URL_ORDER_LOAD_PUMP = `${API_URL_ORDER()}/surtidor`
export const API_URL_ORDER_FINAL_WEIGHING = `${API_URL_ORDER()}/pesajeFinal`
export const API_URL_ORDER_EMAIL_SEND = `${API_URL_ORDER()}/mail`
export const API_URL_ORDER_CLOSE = `${API_URL_ORDER()}/cerrarOrden`

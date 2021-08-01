import { API_BASE_URL } from 'src/api/routes'

export const API_URL_CONCILIATION = `${API_BASE_URL}/conciliaciones`

export const API_URL_CONCILIATION_BY_ORDER_NUMBER = (numeroOrden: string) =>
  `${API_URL_CONCILIATION}/getConciliacion?numero_orden=${numeroOrden}`

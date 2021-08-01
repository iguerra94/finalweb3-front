import Axios from 'axios'
import { API_URL_CONCILIATION_BY_ORDER_NUMBER } from './routes'

// Conciliacion por numero de orden
const getConciliationByOrderNumber = (numeroOrden: string): Promise<any> =>
  Axios.get(API_URL_CONCILIATION_BY_ORDER_NUMBER(numeroOrden))

const conciliationMethods = {
  getConciliationByOrderNumber
}

export default conciliationMethods

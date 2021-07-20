import Axios from 'axios'
import NewOrderCreationData from 'src/model/dto/NewOrderCreationData'
import { API_URL_ORDER } from './routes'

const getOrders = (): Promise<any> => Axios.get(API_URL_ORDER())
const getProductById = (id: number): Promise<any> =>
  Axios.get(API_URL_ORDER(id))
const addOrder = (order: NewOrderCreationData): Promise<any> =>
  Axios.post(API_URL_ORDER(), order)

const productMethods = {
  getOrders,
  getProductById,
  addOrder
}

export default productMethods

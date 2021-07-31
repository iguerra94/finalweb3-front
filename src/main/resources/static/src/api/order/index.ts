import Axios from 'axios'
import NewOrderCreationData from 'src/model/dto/NewOrderCreationData'
import PumpOrderData from 'src/model/dto/PumpOrderData'
import WeighingData from 'src/model/dto/WeighingData'
import {
  API_URL_ORDER,
  API_URL_ORDER_FINAL_WEIGHING,
  API_URL_ORDER_INITIAL_WEIGHING
} from './routes'

const getOrders = (): Promise<any> => Axios.get(API_URL_ORDER())

const getOrderById = (id: number): Promise<any> => Axios.get(API_URL_ORDER(id))

const addOrder = (order: NewOrderCreationData): Promise<any> =>
  Axios.post(API_URL_ORDER(), order)

// Pesaje inicial
const updateInitialWeighing = (data: WeighingData): Promise<any> =>
  Axios.put(API_URL_ORDER_INITIAL_WEIGHING, data)

// actualizar surtidor
const updatePump = (data: PumpOrderData): Promise<any> =>
  Axios.put(API_URL_ORDER_INITIAL_WEIGHING, data)

// Pesaje final
const updateFinalWeighing = (data: WeighingData): Promise<any> =>
  Axios.put(API_URL_ORDER_FINAL_WEIGHING, data)

const orderMethods = {
  getOrders,
  getOrderById,
  addOrder,
  updateInitialWeighing,
  updatePump,
  updateFinalWeighing
}

export default orderMethods

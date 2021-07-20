import Axios from 'axios'
import { API_URL_PRODUCT } from './routes'

const getProducts = (): Promise<any> => Axios.get(API_URL_PRODUCT())
const getProductById = (id: number): Promise<any> =>
  Axios.get(API_URL_PRODUCT(id))

const productMethods = {
  getProducts,
  getProductById
}

export default productMethods

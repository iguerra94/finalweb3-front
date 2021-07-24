import Axios from 'axios'
import { API_URL_TRUCK } from './routes'

const getTrucks = (): Promise<any> => Axios.get(API_URL_TRUCK())
const getTruckById = (id: number): Promise<any> => Axios.get(API_URL_TRUCK(id))

const truckMethods = {
  getTrucks,
  getTruckById
}

export default truckMethods

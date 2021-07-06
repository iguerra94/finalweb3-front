import Axios from 'axios'
import { API_URL_USER_INFO } from './routes'

const getUserInfo = (): Promise<any> => Axios.get(API_URL_USER_INFO)

const userMethods = {
  getUserInfo
}

export default userMethods

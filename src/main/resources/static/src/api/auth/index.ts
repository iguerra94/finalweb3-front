import Axios from 'axios'
import LoginData from 'src/model/dto/LoginData'
import { API_URL_LOGIN } from './routes'

const login = (loginData: LoginData): Promise<any> =>
  Axios.post(API_URL_LOGIN, loginData)

const authMethods = {
  login
}

export default authMethods

import Axios from 'axios'
import { API_LOGIN_URL } from 'src/api/routes/login/routes'
import LoginData from 'src/model/dto/LoginData'

class LoginService {
  /* API REQUESTS */
  public async login(loginData: LoginData): Promise<any> {
    return Axios.post(API_LOGIN_URL, loginData)
  }

  /* VALIDATIONS */
  public validateLoginDataValues(
    loginData: LoginData,
    passwordInputRef: React.RefObject<any>
  ) {
    let errors = {}

    // validateEmail
    if (!loginData.email) {
      errors['email'] = 'Campo requerido'
    } else {
      const emailValid = this.validateEmail(loginData.email)
      if (!emailValid) errors['email'] = 'Email inválido'
    }

    // validatePassword
    if (passwordInputRef.current?.value.length <= 4) {
      errors['password'] = 'La longitud debe ser mayor a 4 carácteres'
    }

    return errors
  }

  private validateEmail = (email: string): boolean => {
    const pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,6}$'
    const regex = new RegExp(pattern, 'i')

    return regex.test(email)
  }
}

export default new LoginService()

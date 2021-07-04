import api from 'src/api/api'
import LoginData from 'src/model/dto/LoginData'

class AuthService {
  /* API REQUESTS */
  public login(loginData: LoginData): Promise<any> {
    return api.auth.login(loginData)
  }

  /* VALIDATIONS */
  public validateLoginDataValues(
    loginData: LoginData,
    passwordInputRef: React.RefObject<any>
  ) {
    let errors = {}

    // validate username
    if (!loginData.username) {
      errors['username'] = 'Campo requerido'
    } else {
      if (loginData.username.length <= 4) {
        errors['username'] = 'La longitud debe ser mayor a 4 carácteres'
      }
    }

    // validate password
    if (!passwordInputRef.current?.value.length) {
      errors['password'] = 'Campo requerido'
    } else {
      if (passwordInputRef.current?.value.length.length <= 4) {
        errors['password'] = 'La longitud debe ser mayor a 4 carácteres'
      }
    }

    return errors
  }
}

export default new AuthService()

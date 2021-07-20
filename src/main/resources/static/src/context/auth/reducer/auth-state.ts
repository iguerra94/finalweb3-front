import User from 'src/model/User'

export interface AuthState {
  validatingCredentials: boolean
  user: User
  userIsLogged: boolean
  loginError: string
}

export const initialAuthState: AuthState = {
  validatingCredentials: true,
  user: {},
  userIsLogged: false,
  loginError: ''
}

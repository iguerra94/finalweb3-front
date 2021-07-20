import { ActionType, AuthActions } from './auth-actions'
import { AuthState, initialAuthState } from './auth-state'

export const authReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case ActionType.ValidateCredentials: {
      return {
        ...state,
        validatingCredentials: true
      }
    }
    case ActionType.Authenticate: {
      const { payload } = action
      return {
        ...state,
        validatingCredentials: false,
        user: payload,
        userIsLogged: true,
        loginError: ''
      }
    }
    case ActionType.ShowLoginError: {
      const { payload } = action
      return {
        ...state,
        loginError: payload
      }
    }
    case ActionType.HideLoginError: {
      return {
        ...state,
        loginError: ''
      }
    }
    case ActionType.Logout: {
      return { ...initialAuthState, validatingCredentials: false }
    }
    default:
      throw new Error(`Invalid action type: ${action}`)
  }
}

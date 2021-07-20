import { createContext, useContext, useReducer } from 'react'
import { authReducer } from 'src/context/auth/reducer'
import { AuthActions } from 'src/context/auth/reducer/auth-actions'
import {
  AuthState,
  initialAuthState
} from 'src/context/auth/reducer/auth-state'

type AuthContextType = {
  state: AuthState
  dispatch: React.Dispatch<AuthActions>
}

const AuthContext = createContext<AuthContextType>({
  state: initialAuthState,
  dispatch: () => {}
})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

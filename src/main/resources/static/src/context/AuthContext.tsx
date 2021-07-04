import { createContext, useContext, useReducer } from 'react'
import { authReducer } from 'src/config/reducer'
import { AuthActions } from 'src/config/reducer/actions'
import { AuthState, initialAuthState } from 'src/config/reducer/state'

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

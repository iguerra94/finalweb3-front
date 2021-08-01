import { useEffect } from 'react'
import { Suspense } from 'react'
import { Switch } from 'react-router-dom'
import { CustomPrivateRouteProps, ROUTES } from './routes'

import PrivateRoute from './PrivateRoute'
import { HTTP_STATUS_CODE } from 'src/api/http-status-codes'
import { useAuth } from 'src/context/auth/AuthContext'
import useLocalStorage, { LS_KEYS } from 'src/hooks/useLocalStorage'
import { ActionType } from '../../context/auth/reducer/auth-actions'

import Axios from 'axios'
import { TIMEOUT_500_MS } from 'src/utils/config-utils'

const LoggedUserRouter = () => {
  const [, setToken] = useLocalStorage(LS_KEYS.AUTH_TOKEN, '')
  const { dispatch } = useAuth()

  useEffect(() => {
    // Setup response interceptor
    Axios.interceptors.response.use(
      (value) => {
        return value
      },
      (error) => {
        if (error.response.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          handleLogout()
        }
        return Promise.reject(error)
      }
    )
  }, [])

  const handleLogout = () => {
    dispatch({ type: ActionType.ValidateCredentials })
    setToken(undefined)

    setTimeout(() => {
      dispatch({ type: ActionType.Logout })
    }, TIMEOUT_500_MS)
  }

  return (
    <Suspense fallback={<span>Cargando...</span>}>
      <Switch>
        {Object.values(ROUTES.PrivateRoutes).map(
          (ROUTE: CustomPrivateRouteProps) => (
            // Route
            <PrivateRoute
              key={ROUTE.pathUrl()}
              exact
              path={ROUTE.pathUrl()}
              component={ROUTE.component}
              hasRenderCondition={ROUTE.hasRenderCondition}
              renderCondition={ROUTE.renderCondition}
            />
          )
        )}
      </Switch>
    </Suspense>
  )
}

export default LoggedUserRouter

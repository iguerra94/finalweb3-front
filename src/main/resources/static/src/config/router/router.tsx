import React, { useEffect } from 'react'
import { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import Loading from 'src/components/Loading'
import { useAuth } from 'src/context/AuthContext'
import userService from 'src/service/userService'
import { TIMEOUT_500_MS } from 'src/utils/config-utils'
import MainWrapper from 'src/views/main-wrapper/MainWrapper'
import { ActionType } from '../reducer/actions'
import LoggedUserRouter from './LoggedUserRouter'
import PublicRoute from './PublicRoute'
import { CustomPrivateRouteProps, ROUTES } from './routes'

const Login = React.lazy(() => import('src/views/login/Login'))

const AppRouter = () => {
  const {
    state: { validatingCredentials, userIsLogged },
    dispatch
  } = useAuth()

  useEffect(() => {
    authenticateUser()
  }, [])

  const authenticateUser = () => {
    userService
      .getUserInfo()
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: ActionType.Authenticate,
            payload: res.data
          })
        }, TIMEOUT_500_MS)
      })
      .catch(() => {
        setTimeout(() => {
          dispatch({
            type: ActionType.Logout
          })
        }, TIMEOUT_500_MS)
      })
  }

  if (validatingCredentials) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {/* Root Route: If user is logged, navigate to /order. Else render Login component */}
          <Route exact path={ROUTES.Root.pathUrl}>
            {userIsLogged ? (
              <Redirect to={ROUTES.PrivateRoutes.OrderList.pathUrl()} />
            ) : (
              <Redirect to={ROUTES.Login.pathUrl} />
            )}
          </Route>

          {/* Login Route */}
          <PublicRoute exact path={ROUTES.Login.pathUrl} component={Login} />

          {/*
            Private Routes: If user is logged, go to LoggedUserRouter and decide which ROUTE to render.
            Else render Login component
          */}
          <MainWrapper>
            {Object.values(ROUTES.PrivateRoutes).map(
              (ROUTE: CustomPrivateRouteProps) => (
                // Route
                <Route key={ROUTE.pathUrl()} exact path={ROUTE.pathUrl()}>
                  <LoggedUserRouter />
                </Route>
              )
            )}
          </MainWrapper>

          <Route path="*">
            <Redirect to={ROUTES.Root.pathUrl} />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default AppRouter

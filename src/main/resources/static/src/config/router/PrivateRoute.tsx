import { Redirect, Route, useLocation } from 'react-router-dom'
import { useAuth } from 'src/context/auth/AuthContext'

import { ROUTES } from './routes'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { state } = useAuth()
  const { userIsLogged } = state
  const location = useLocation()

  return (
    <Route {...rest}>
      {userIsLogged ? (
        RenderComponent(Component)
      ) : (
        <Redirect
          to={{ pathname: ROUTES.Login.pathUrl, state: { from: location } }}
        />
      )}
    </Route>
  )
}

const RenderComponent = (Component) => <Component />

export default PrivateRoute

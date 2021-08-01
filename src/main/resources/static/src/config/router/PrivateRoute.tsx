import { Redirect, Route, useLocation } from 'react-router-dom'
import { useAuth } from 'src/context/auth/AuthContext'

import { ROUTES } from './routes'

const PrivateRoute = ({
  component: Component,
  hasRenderCondition,
  renderCondition,
  ...rest
}) => {
  const { state } = useAuth()
  const { user, userIsLogged } = state
  const location = useLocation()

  return (
    <Route {...rest}>
      {userIsLogged ? (
        !hasRenderCondition ||
        (hasRenderCondition && renderCondition(user.roles![0].name)) ? (
          RenderComponent(Component)
        ) : (
          <Redirect
            to={{
              pathname: ROUTES.PrivateRoutes.OrderList.pathUrl(),
              state: { from: location }
            }}
          />
        )
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

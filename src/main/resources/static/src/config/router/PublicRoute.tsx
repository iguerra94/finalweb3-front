import { Redirect, Route } from 'react-router-dom'
import { useAuth } from 'src/context/auth/AuthContext'

import { ROUTES } from './routes'

const PublicRoute = ({ component: Component, ...rest }) => {
  const {
    state: { userIsLogged }
  } = useAuth()

  return (
    <Route {...rest}>
      {!userIsLogged ? (
        RenderComponent(Component)
      ) : (
        <Redirect to={ROUTES.PrivateRoutes.OrderList.pathUrl()} />
      )}
    </Route>
  )
}

const RenderComponent = (Component) => <Component />

export default PublicRoute

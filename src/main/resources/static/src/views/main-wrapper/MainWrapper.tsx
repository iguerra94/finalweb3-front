import { Box, Button } from '@material-ui/core'
import { useAuth } from 'src/context/AuthContext'
import { useHistory } from 'react-router-dom'
import { ROUTES } from 'src/config/router/routes'

const MainWrapper: React.FC = ({ children }) => {
  const {
    state: { userIsLogged }
  } = useAuth()

  const history = useHistory()

  return (
    <>
      {userIsLogged && (
        <Box>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.replace(ROUTES.PrivateRoutes.NewOrder.pathUrl())
            }}
          >
            Nueva orden
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
            }}
          >
            Lista de ordenes
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.replace(ROUTES.PrivateRoutes.OrderDetail.pathUrl('123'))
            }}
          >
            Detalle de orden
          </Button>
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={() => {
              history.replace(ROUTES.Login.pathUrl)
            }}
          >
            Login
          </Button>
        </Box>
      )}

      {/* Logged User router */}
      {children}
    </>
  )
}

export default MainWrapper

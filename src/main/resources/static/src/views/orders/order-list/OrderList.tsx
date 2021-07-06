import { Box, Button } from '@material-ui/core'
import { ActionType } from 'src/config/reducer/actions'
import { useAuth } from 'src/context/AuthContext'
import useLocalStorage, { LS_KEYS } from 'src/hooks/useLocalStorage'
import { TIMEOUT_500_MS } from 'src/utils/config-utils'

const OrderList: React.FC = () => {
  const [, setToken] = useLocalStorage(LS_KEYS.AUTH_TOKEN, '')
  const { dispatch } = useAuth()

  const handleLogout = () => {
    dispatch({ type: ActionType.ValidateCredentials })

    setTimeout(() => {
      setToken(undefined)
      dispatch({ type: ActionType.Logout })
    }, TIMEOUT_500_MS)
  }

  return (
    <Box>
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </Box>
  )
}

export default OrderList

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import TextField from '@material-ui/core/TextField'
import useStyles from './LoadPumpPasswordInputStyles'
import orderService from 'src/service/orderService'
import { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import PumpOrderData from 'src/model/dto/PumpOrderData'
import { useHistory } from 'react-router-dom'
import { ROUTES } from 'src/config/router/routes'
import { useOrdersLoad } from 'src/context/orders-load/OrdersLoad'
import { ActionType as OrdersLoadActionType } from 'src/context/orders-load/reducer/orders-load-actions'
import orderUtils from 'src/utils/order-utils'

const LoadPumpPasswordInput = () => {
  const classes = useStyles()
  const [isValidatingPassword, setIsValidatingPassword] =
    useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState('')

  const history = useHistory()

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  const { state: ordersLoadState, dispatch: ordersLoadDispatch } =
    useOrdersLoad()

  useEffect(() => {
    validateData()
  }, [])

  const validateData = () => {
    setError(!passwordValid(password) ? 'Debe contener 5 caracteres' : '')
  }

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  const beginLoadingPump = async () => {
    try {
      setIsValidatingPassword(true)

      const current_timestamp = new Date()
      current_timestamp.setHours(current_timestamp.getHours())
      const fecha = current_timestamp.toISOString()

      const randomValues = orderUtils.generateRandomValues()

      const pumpOrderData: PumpOrderData = {
        fecha,
        idOrden: modalDynamicData.numeroOrden,
        masaAcumulada: randomValues.masaAcumulada,
        password,
        // temperatura: 30
        temperatura: randomValues.temperatura
      }

      await orderService.updatePump(pumpOrderData)

      setTimeout(() => {
        setIsValidatingPassword(false)

        ordersLoadDispatch({
          type: OrdersLoadActionType.UpdateOrdersLoadList,
          payload: [
            ...ordersLoadState.orders,
            { idOrden: modalDynamicData.numeroOrden, password }
          ]
        })

        dispatch({
          type: ActionType.SetLoading,
          payload: { loadingData: true }
        })

        dispatch({
          type: ActionType.CloseModal
        })

        history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())

        dispatch({
          type: ActionType.OpenSnackbar,
          payload: {
            message: `Ha comenzado la carga del surtidor en la orden #${modalDynamicData.numeroOrden}`,
            severity: 'success'
          }
        })
      }, 500)

      setTimeout(() => {
        dispatch({
          type: ActionType.CloseSnackbar
        })
      }, 5000)
    } catch (e) {
      setTimeout(() => {
        setIsValidatingPassword(false)

        setError(e.response.data.message)
      }, 500)
    }
  }

  const passwordValid = (value) => value.length === 5

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Ingresa la password para iniciar la carga
        </DialogContentText>
        <form noValidate>
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-text"
              label="Password"
              type="text"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setError(
                  !passwordValid(e.target.value)
                    ? 'Debe contener 5 caracteres'
                    : ''
                )
                setPassword(e.target.value)
              }}
              onBlur={(e) => {
                setError(
                  !passwordValid(e.target.value)
                    ? 'Debe contener 5 caracteres'
                    : ''
                )
                setPassword(e.target.value)
              }}
              error={error.length > 0}
              helperText={error}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={(e) => {
            e.stopPropagation()

            beginLoadingPump()
          }}
          variant="contained"
          color="primary"
          disabled={error.length > 0 || isValidatingPassword}
        >
          {isValidatingPassword ? (
            <CircularProgress size={14} style={{ position: 'absolute' }} />
          ) : null}
          Iniciar carga
        </Button>
      </DialogActions>
    </>
  )
}

export default LoadPumpPasswordInput

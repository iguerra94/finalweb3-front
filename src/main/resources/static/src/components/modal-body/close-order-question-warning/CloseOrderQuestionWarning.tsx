import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useUI } from 'src/context/ui/UIContext'
import useStyles from './CloseOrderQuestionWarningStyles'
import { useHistory } from 'react-router-dom'

import { displayLoadInfoModal } from 'src/utils/function-utils'
import Loading from 'src/components/loading/Loading'
import orderService from 'src/service/orderService'
import { useState } from 'react'
import { ROUTES } from 'src/config/router/routes'

const CloseOrderQuestionWarning = () => {
  const classes = useStyles()

  const [closingOrder, setClosingOrder] = useState(false)

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  const history = useHistory()

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
    displayLoadInfoModal(
      modalDynamicData.idOrden,
      modalDynamicData.numeroOrden,
      dispatch
    )
  }

  const handleOrderClose = () => {
    setClosingOrder(true)
    closeOrder()
  }

  const closeOrder = async () => {
    try {
      const data = { idOrden: modalDynamicData.numeroOrden }

      await orderService.closeOrder(data)

      dispatch({ type: ActionType.SetLoading, payload: { loadingData: true } })
      dispatch({ type: ActionType.CloseModal })
      history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())

      setTimeout(() => {
        dispatch({
          type: ActionType.OpenSnackbar,
          payload: {
            message: 'Se ha cerrado la orden con éxito',
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
      dispatch({ type: ActionType.SetLoading, payload: { loadingData: true } })
      dispatch({ type: ActionType.CloseModal })
      history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())

      setTimeout(() => {
        dispatch({
          type: ActionType.OpenSnackbar,
          payload: {
            message: 'Ocurrió un error al cerrar la orden',
            severity: 'error'
          }
        })
      }, 500)

      setTimeout(() => {
        dispatch({
          type: ActionType.CloseSnackbar
        })
      }, 5000)
    }
  }

  return closingOrder ? (
    <DialogContent className={classes.dialogContent}>
      <Loading size={24} thickness={4} className={classes.loadingSm} />
      <DialogContentText>Cerrando la orden...</DialogContentText>
    </DialogContent>
  ) : (
    <>
      <DialogContent>
        <DialogContentText>
          ¿Estas seguro de cerrar la orden?
          <br />
          <br />
          <span style={{ fontSize: '14px' }}>
            Esta accion detendrá la carga del surtidor y pondra la orden estado
            3
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleOrderClose} variant="contained" color="primary">
          Si
        </Button>
      </DialogActions>
    </>
  )
}

export default CloseOrderQuestionWarning

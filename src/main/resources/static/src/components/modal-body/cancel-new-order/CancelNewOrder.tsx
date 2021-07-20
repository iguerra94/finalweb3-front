import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { useHistory } from 'react-router-dom'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType as NewOrderActionType } from 'src/context/new-order/reducer/new-order-actions'
import { ROUTES } from 'src/config/router/routes'

const CancelNewOrder = () => {
  const { dispatch: uiDispatch } = useUI()
  const { dispatch: newOrderDispatch } = useNewOrder()

  const history = useHistory()

  const handleClose = () => {
    uiDispatch({ type: ActionType.CloseModal })
  }

  const handleNewOrderCancellation = () => {
    newOrderDispatch({ type: NewOrderActionType.ClearNewOrderData })
    uiDispatch({ type: ActionType.CloseModal })
    history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>
          ¿Deseas cancelar la creación de la orden?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button
          onClick={handleNewOrderCancellation}
          variant="contained"
          color="primary"
        >
          Si
        </Button>
      </DialogActions>
    </>
  )
}

export default CancelNewOrder

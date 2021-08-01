import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useHistory } from 'react-router-dom'

import useStyles from './PostFinalWeighingMessageStyles'
import { ROUTES } from 'src/config/router/routes'

const PostFinalWeighingMessage = () => {
  const classes = useStyles()

  const history = useHistory()

  const { dispatch } = useUI()

  const handleClose = () => {
    dispatch({ type: ActionType.SetLoading, payload: { loadingData: true } })
    dispatch({ type: ActionType.CloseModal })
    history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
  }

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Se actualizó el pesaje final de la orden con exito.
          <br />
          <br />
          Podrás visualizar todos los detalles de la conciliación haciendo click
          en el boton "Ver Conciliación" que aparece en el detalle de la orden.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Aceptar
        </Button>
      </DialogActions>
    </>
  )
}

export default PostFinalWeighingMessage

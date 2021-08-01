import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useHistory } from 'react-router-dom'

import useStyles from './PostInitialWeighingMessageStyles'
import { ROUTES } from 'src/config/router/routes'

const PostInitialWeighingMessage = () => {
  const classes = useStyles()

  const history = useHistory()

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  const handleClose = () => {
    dispatch({ type: ActionType.SetLoading, payload: { loadingData: true } })
    dispatch({ type: ActionType.CloseModal })
    history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
  }

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Se actualizó el pesaje inicial de la orden con exito.
          <br />
          <br />
          Para cargar el surtidor deberá ingresar la siguiente password
          generada:{' '}
          <span style={{ color: 'red' }}>{modalDynamicData.password}</span>
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

export default PostInitialWeighingMessage

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useHistory } from 'react-router-dom'

import useStyles from './UpdateOrderEmailSendStyles'
import { ROUTES } from 'src/config/router/routes'
import { useEffect, useState } from 'react'
import orderService from 'src/service/orderService'
import { TIMEOUT_1000_MS } from 'src/utils/config-utils'

const UpdateOrderEmailSend = () => {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const classes = useStyles()

  const history = useHistory()

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  useEffect(() => {
    actualizarEnvioMail()
  }, [])

  const actualizarEnvioMail = async () => {
    try {
      const emailSendData = {
        idOrden: modalDynamicData.idOrden,
        envioMail: 0
      }

      await orderService.updateEmailSend(emailSendData)

      setTimeout(() => {
        setLoading(false)
      }, TIMEOUT_1000_MS)
    } catch (e) {
      setTimeout(() => {
        setLoading(false)
        setError(e.response.data.message)
      }, TIMEOUT_1000_MS)
    }
  }

  const handleClose = () => {
    dispatch({ type: ActionType.SetLoading, payload: { loadingData: true } })
    dispatch({ type: ActionType.CloseModal })
    history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())
  }

  return (
    <>
      {isLoading ? (
        <>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>Actualizando envio de mail...</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogContent className={classes.dialogContent}>
            <DialogContentText>
              {error ? (
                <>
                  Error al actualizar el envio de mail.
                  <br />
                  <br />
                  <span style={{ color: 'red' }}>{error}</span>
                </>
              ) : (
                'Se actualizó el envio de mail exitosamente en la orden'
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </>
      )}
    </>
  )
}

export default UpdateOrderEmailSend

import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import useStyles from './CreatingNewOrderStyles'
import Loading from 'src/components/loading/Loading'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'
import { useUI } from 'src/context/ui/UIContext'
import { ROUTES } from 'src/config/router/routes'
import orderService from 'src/service/orderService'

const CreatingNewOrder = () => {
  const { state } = useNewOrder()
  const { dispatch } = useUI()

  const classes = useStyles()

  const history = useHistory()

  useEffect(() => {
    createOrder()
  }, [])

  const createOrder = async () => {
    try {
      const newOrderData = {
        numeroOrden: state.basicData.numeroOrden,
        fechaPrevistaCarga: state.basicData.fechaPrevistaCarga,
        tiempoAlmacenaje: state.basicData.tiempoAlmacenaje,
        preset: state.basicData.preset,
        camion: {
          dominio: state.truckData.dominio,
          chofer: {
            nombre: state.truckData.chofer.nombre,
            apellido: state.truckData.chofer.apellido,
            dni: state.truckData.chofer.dni,
            telefono: state.truckData.chofer.telefono
          },
          cisternaList: state.truckData.cisternaList
        },
        cliente: {
          nombre: state.clientData.nombre,
          apellido: state.clientData.apellido,
          dni: state.clientData.dni,
          telefono: state.clientData.telefono,
          email: state.clientData.email
        },
        producto: {
          nombre: state.productData.nombre,
          descripcion: state.productData.descripcion,
          precio: state.productData.precio
        }
      }

      await orderService.addOrder(newOrderData)

      history.replace(ROUTES.PrivateRoutes.OrderList.pathUrl())

      dispatch({ type: ActionType.CloseModal })

      dispatch({
        type: ActionType.OpenSnackbar,
        payload: {
          message: 'Se ha creado la nueva orden con éxito',
          severity: 'success'
        }
      })

      setTimeout(() => {
        dispatch({
          type: ActionType.CloseSnackbar
        })
      }, 3000)
    } finally {
    }
  }

  return (
    <DialogContent className={classes.dialogContent}>
      <Loading size={24} thickness={4} className={classes.loadingSm} />
      <DialogContentText>Creando Nueva orden...</DialogContentText>
    </DialogContent>
  )
}

export default CreatingNewOrder

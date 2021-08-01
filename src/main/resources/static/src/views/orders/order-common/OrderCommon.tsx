import { Box, Button } from '@material-ui/core'
import { ROUTES } from 'src/config/router/routes'
import { Link } from 'react-router-dom'

import { useUI } from 'src/context/ui/UIContext'
import {
  displayLoadInfoModal,
  orderStateActionClickHandlerMap,
  orderStateActionLabelMap,
  orderStateColorMap
} from 'src/utils/function-utils'

import useStyles from '../order-list/OrderListStyles'

export const OrderState = ({ estado }) => {
  const classes = useStyles()

  return (
    <Box
      style={{
        backgroundColor: orderStateColorMap[estado]
      }}
      className={classes.orderStateItem}
    >
      {estado}
    </Box>
  )
}

export const OrderAction = ({
  id,
  numeroOrden,
  estado,
  masaAcumulada,
  showActionButton
}) => {
  const classes = useStyles()
  const { dispatch } = useUI()

  const setOrderActionByEstadoAndMasaAcumulada = (
    estado: number,
    masaAcumulada: number
  ) => {
    if (estado !== 2 || masaAcumulada === 0) {
      orderStateActionClickHandlerMap[estado](numeroOrden, dispatch)
      return
    }
    if (masaAcumulada > 0) {
      displayLoadInfoModal(id, numeroOrden, dispatch)
    }
  }

  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          className={classes.orderActionBtn}
          onClick={() => {
            setOrderActionByEstadoAndMasaAcumulada(estado, masaAcumulada)
          }}
        >
          {estado === 2 && masaAcumulada > 0
            ? 'Ver información de carga'
            : orderStateActionLabelMap[estado]}
        </Button>
        {/* {estado === 2 ? (
          <Box display="flex" alignItems="center">
            <Typography
              style={{
                display: 'flex',
                alignItems: 'center',
                color: '#F44336',
                margin: '0 1rem 0 2rem'
              }}
            >
              Temperatura alta
            </Typography>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#F44336',
                color: 'white',
                textTransform: 'none'
              }}
            >
              Aceptar
            </Button>
          </Box>
        ) : null} */}
      </Box>

      {showActionButton ? (
        <Link to={ROUTES.PrivateRoutes.OrderDetail.pathUrl(id)}>
          <Button style={{ textTransform: 'none' }}>Detalle</Button>
        </Link>
      ) : null}
    </Box>
  )
}

export function createDataListView(
  id: number,
  numeroOrden: string,
  estado: number,
  masaAcumulada: number
) {
  return {
    numeroOrden,
    estado: <OrderState estado={estado} />,
    accion: (
      <OrderAction
        id={id}
        numeroOrden={numeroOrden}
        estado={estado}
        masaAcumulada={masaAcumulada}
        showActionButton={true}
      />
    )
  }
}

export function createDataDetailView(
  id: number,
  numeroOrden: string,
  estado: number,
  masaAcumulada: number
) {
  return {
    numeroOrden,
    estado: <OrderState estado={estado} />,
    accion: (
      <OrderAction
        id={id}
        numeroOrden={numeroOrden}
        estado={estado}
        masaAcumulada={masaAcumulada}
        showActionButton={false}
      />
    )
  }
}

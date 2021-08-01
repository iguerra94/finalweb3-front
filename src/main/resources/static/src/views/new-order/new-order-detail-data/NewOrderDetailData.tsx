import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useEffect } from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType as UIActionType } from 'src/context/ui/reducer/ui-actions'
import { formatDate } from 'src/utils/function-utils'

const CreatingNewOrder = React.lazy(
  () => import('src/components/modal-body/creating-new-order/CreatingNewOrder')
)

const NewOrderDetailData = ({ classes }) => {
  const { state, dispatch } = useNewOrder()
  const { dispatch: uiDispatch } = useUI()

  useEffect(() => {
    dispatch({
      type: ActionType.UpdateBtnCreateOrderClickHandler,
      payload: { btnCreateOrderClickHandler: showCreatingNewOrderModal }
    })
  }, [])

  const showCreatingNewOrderModal = () => {
    uiDispatch({
      type: UIActionType.OpenModal,
      payload: {
        modalBody: CreatingNewOrder,
        modalTitle: ''
      }
    })
  }

  return (
    <Box className={classes.sectionContainer}>
      <Box component={'h3'}>Detalle de la orden</Box>
      <Box className={classes.sectionContent}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Box component={'h4'} marginBottom="1rem">
              Datos basicos
            </Box>
            <Box>
              <Typography className={classes.itemDetailText}>
                <strong>Numero de orden: </strong>#
                {state.basicData?.numeroOrden}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Fecha prevista de carga: </strong>
                {formatDate(state.basicData!.fechaPrevistaCarga)}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Tiempo de almacenaje: </strong>
                {state.basicData?.tiempoAlmacenaje}seg
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Preset: </strong>
                {state.basicData?.preset}L
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs>
            <Box component={'h4'} marginBottom="1rem">
              Camion
            </Box>
            <Box>
              <Typography className={classes.itemDetailText}>
                <strong>Dominio: </strong>
                {state.truckData?.dominio}
              </Typography>
              {state.truckData?.cisternaList!.map((cisterna, index) => (
                <Typography key={index} className={classes.itemDetailText}>
                  <strong>Cisterna #{index + 1}: </strong>
                  {cisterna.capacidad}L
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid item xs>
            <Box component={'h4'} marginBottom="1rem">
              Chofer
            </Box>
            <Box>
              <Typography className={classes.itemDetailText}>
                <strong>Nombre: </strong>
                {state.truckData?.chofer.nombre}{' '}
                {state.truckData?.chofer.apellido}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>DNI: </strong>
                {state.truckData?.chofer.dni}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Telefono: </strong>
                {state.truckData?.chofer.telefono}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs>
            <Box component={'h4'} marginBottom="1rem">
              Cliente
            </Box>
            <Box>
              <Typography className={classes.itemDetailText}>
                <strong>Nombre: </strong>
                {state.clientData?.nombre} {state.clientData?.apellido}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>DNI: </strong>
                {state.clientData?.dni}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Telefono: </strong>
                {state.clientData?.telefono}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Email: </strong>
                {state.clientData?.email}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Box component={'h4'} marginBottom="1rem">
              Producto
            </Box>
            <Box>
              <Typography className={classes.itemDetailText}>
                <strong>Nombre: </strong>
                {state.productData?.nombre}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Descripcion: </strong>
                {state.productData?.descripcion}
              </Typography>
              <Typography className={classes.itemDetailText}>
                <strong>Precio: </strong>${state.productData?.precio}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NewOrderDetailData

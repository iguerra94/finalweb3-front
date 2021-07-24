import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { HelpOutline } from '@material-ui/icons'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import { BasicData } from 'src/context/new-order/reducer/new-order-state'
import orderService from 'src/service/orderService'

const NewOrderBasicData = ({ classes }) => {
  const loadDateInputRef = useRef<any>(null)
  const storeTimeInputRef = useRef<any>(null)
  const presetInputRef = useRef<any>(null)

  const [data, setData] = useState<BasicData>({
    numeroOrden: '',
    fechaPrevistaCarga: moment()
      .add('3', 'minutes')
      .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
    tiempoAlmacenaje: 1,
    preset: 500
  })

  const {
    state: { basicData },
    dispatch
  } = useNewOrder()

  useEffect(() => {
    setData(basicData)

    if (!basicData.numeroOrden) {
      setNewOrderNumber()
    }
  }, [])

  const setNewOrderNumber = async () => {
    let newOrderNumber
    try {
      const results = await orderService.getOrders()

      newOrderNumber = `${results.length + 1}`.padStart(8, '0')
    } catch (e) {
      newOrderNumber = `0`.padStart(8, '0')
    } finally {
      setData((_data) => ({
        ..._data,
        numeroOrden: newOrderNumber
      }))

      // Update NewOrder context state
      dispatch({
        type: ActionType.UpdateBasicData,
        payload: {
          ...data,
          numeroOrden: newOrderNumber
        }
      })
    }
  }

  useEffect(() => {
    const dataCompleted =
      data.numeroOrden &&
      data.numeroOrden.length > 0 &&
      data.fechaPrevistaCarga &&
      // data.fechaPrevistaCarga > 0 &&
      data.tiempoAlmacenaje &&
      data.tiempoAlmacenaje > 0 &&
      data.preset &&
      data.preset > 0

    if (dataCompleted) {
      dispatch({
        type: ActionType.UpdateBtnNextStepEnabledState,
        payload: {
          btnNextStepEnabled: true
        }
      })
    } else {
      dispatch({
        type: ActionType.UpdateBtnNextStepEnabledState,
        payload: {
          btnNextStepEnabled: false
        }
      })
    }
  }, [data])

  const updateBasicData = (prop, value, { type }) => {
    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      [prop]: type === 'number' ? parseInt(value) : value
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateBasicData,
      payload: { ...data, [prop]: type === 'number' ? parseInt(value) : value }
    })
  }

  return (
    <Box className={classes.sectionContainer}>
      <Box component={'h3'} className={classes.sectionSubtitle}>
        Datos de la orden
      </Box>
      <Box className={classes.sectionContent}>
        <Box className={classes.inputContainer}>
          <TextField
            label="Numero de orden"
            variant="outlined"
            className={classes.input}
            value={data?.numeroOrden || basicData?.numeroOrden}
            disabled
          />
          <Tooltip title="Identifica univocamente a la orden">
            <HelpOutline />
          </Tooltip>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            ref={loadDateInputRef}
            label="Fecha prevista de carga"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: moment()
                  .add('3', 'minutes')
                  .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
              }
            }}
            type="datetime-local"
            variant="outlined"
            className={classes.input}
            value={data?.fechaPrevistaCarga || basicData.fechaPrevistaCarga}
            onChange={(e) => {
              updateBasicData('fechaPrevistaCarga', e.target.value, {
                type: 'date'
              })
            }}
            onKeyUp={() => {
              if (data.fechaPrevistaCarga < loadDateInputRef.current.min) {
                updateBasicData(
                  'fechaPrevistaCarga',
                  loadDateInputRef.current.min,
                  {
                    type: 'date'
                  }
                )
              }
            }}
          />
          <Tooltip title="Turno para cargar combustible">
            <HelpOutline />
          </Tooltip>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            ref={storeTimeInputRef}
            label="Tiempo de almacenaje"
            InputProps={{
              inputProps: {
                min: 1,
                max: 10
              }
            }}
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.tiempoAlmacenaje || basicData?.tiempoAlmacenaje}
            onChange={(e) => {
              updateBasicData('tiempoAlmacenaje', e.target.value, {
                type: 'number'
              })
            }}
            onKeyUp={() => {
              if (data.tiempoAlmacenaje < 1) {
                updateBasicData('tiempoAlmacenaje', 1, {
                  type: 'number'
                })
              }

              if (data.tiempoAlmacenaje > 10) {
                updateBasicData('tiempoAlmacenaje', 10, {
                  type: 'number'
                })
              }
            }}
          />
          <Tooltip title="Frecuencia de almacenamiento">
            <HelpOutline />
          </Tooltip>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            ref={presetInputRef}
            label="Preset"
            InputProps={{
              inputProps: {
                min: 500,
                max: 2000
              }
            }}
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.preset || basicData?.preset}
            onChange={(e) => {
              updateBasicData('preset', e.target.value, { type: 'number' })
            }}
            onKeyUp={() => {
              if (data.preset < 500) {
                updateBasicData('preset', 500, {
                  type: 'number'
                })
              }

              if (data.preset > 2000) {
                updateBasicData('preset', 2000, {
                  type: 'number'
                })
              }
            }}
          />
          <Tooltip title="Limite de carga">
            <HelpOutline />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default NewOrderBasicData

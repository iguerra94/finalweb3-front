import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { HelpOutline } from '@material-ui/icons'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import { BasicData } from 'src/context/new-order/reducer/new-order-state'
import orderService from 'src/service/orderService'

const NewOrderBasicData = ({ classes }) => {
  const [data, setData] = useState<BasicData>({
    numeroOrden: '',
    fechaPrevistaCarga: moment().format(moment.HTML5_FMT.DATE),
    tiempoAlmacenaje: 0,
    preset: 0
  })

  const [errors, setErrors] = useState({
    tiempoAlmacenaje: '',
    preset: ''
  })

  const {
    state: { basicData },
    dispatch
  } = useNewOrder()

  useEffect(() => {
    if (basicData) {
      setData(basicData)

      validateData()
    } else {
      dispatch({
        type: ActionType.UpdateBtnNextStepEnabledState,
        payload: {
          btnNextStepEnabled: false
        }
      })
    }

    if (!basicData.numeroOrden) {
      setNewOrderNumber()
    }
  }, [])

  useEffect(() => {
    dispatch({
      type: ActionType.UpdateBtnNextStepEnabledState,
      payload: {
        btnNextStepEnabled: Object.values(errors).every(
          (value) => value.length === 0
        )
      }
    })
  }, [errors])

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

  const setError = (prop: string, value: string) => {
    setErrors((_errors) => ({
      ..._errors,
      [prop]: value
    }))
  }

  const validateData = () => {
    setError(
      'tiempoAlmacenaje',
      !tiempoAlmacenajeValid(basicData.tiempoAlmacenaje)
        ? 'Debe ser un valor entre 1 y 10'
        : ''
    )

    setError(
      'preset',
      !presetValid(basicData.preset) ? 'Debe ser un valor entre 1 y 10000' : ''
    )
  }

  const tiempoAlmacenajeValid = (value) =>
    parseInt(value) >= 1 && parseInt(value) <= 10

  const presetValid = (value) =>
    parseInt(value) >= 1 && parseInt(value) <= 10000

  return (
    <Box className={classes.sectionContainer}>
      <Box component={'h3'}>Datos de la orden</Box>
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
            label="Fecha prevista de carga"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                min: moment().format(moment.HTML5_FMT.DATE)
              }
            }}
            type="date"
            variant="outlined"
            className={classes.input}
            value={data?.fechaPrevistaCarga || basicData.fechaPrevistaCarga}
            onChange={(e) => {
              updateBasicData('fechaPrevistaCarga', e.target.value, {
                type: 'date'
              })
            }}
          />
          <Tooltip title="Turno para cargar combustible">
            <HelpOutline />
          </Tooltip>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Tiempo de almacenaje"
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.tiempoAlmacenaje || basicData?.tiempoAlmacenaje}
            onChange={(e) => {
              setError(
                'tiempoAlmacenaje',
                !tiempoAlmacenajeValid(e.target.value)
                  ? 'Debe ser un valor entre 1 y 10'
                  : ''
              )
              updateBasicData('tiempoAlmacenaje', e.target.value, {
                type: 'number'
              })
            }}
            onBlur={(e) => {
              setError(
                'tiempoAlmacenaje',
                !tiempoAlmacenajeValid(e.target.value)
                  ? 'Debe ser un valor entre 1 y 10'
                  : ''
              )
              updateBasicData('tiempoAlmacenaje', e.target.value, {
                type: 'number'
              })
            }}
            error={errors['tiempoAlmacenaje'].length > 0}
            helperText={errors['tiempoAlmacenaje']}
          />
          <Tooltip title="Frecuencia de almacenamiento">
            <HelpOutline />
          </Tooltip>
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Preset"
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.preset || basicData?.preset}
            onChange={(e) => {
              setError(
                'preset',
                !presetValid(e.target.value)
                  ? 'Debe ser un valor entre 1 y 10000'
                  : ''
              )
              updateBasicData('preset', e.target.value, { type: 'number' })
            }}
            onBlur={(e) => {
              setError(
                'preset',
                !presetValid(e.target.value)
                  ? 'Debe ser un valor entre 1 y 10000'
                  : ''
              )
              updateBasicData('preset', e.target.value, { type: 'number' })
            }}
            error={errors['preset'].length > 0}
            helperText={errors['preset']}
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

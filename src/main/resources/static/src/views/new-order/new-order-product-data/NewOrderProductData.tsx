import Box from '@material-ui/core/Box'
import Producto from 'src/model/Producto'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'

const NewOrderProductData = ({ classes }) => {
  const [data, setData] = useState<Producto>({
    nombre: '',
    descripcion: '',
    precio: 0
  })

  const [errors, setErrors] = useState({
    nombre: 'Debe ser mayor a cuatro carascteres',
    descripcion: 'Debe ser mayor a cuatro carascteres',
    precio: 'Debe ser un valor entre $200 y $10000'
  })

  const {
    state: { productData },
    dispatch
  } = useNewOrder()

  useEffect(() => {
    if (productData) {
      console.log('HOLA')
      setData(productData)
    } else {
      dispatch({
        type: ActionType.UpdateBtnNextStepEnabledState,
        payload: {
          btnNextStepEnabled: false
        }
      })
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

  const updateProductData = (prop, value, { type }) => {
    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      [prop]: type === 'number' ? parseInt(value) : value
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateProductData,
      payload: { ...data, [prop]: type === 'number' ? parseInt(value) : value }
    })
  }

  const setError = (prop: string, value: string) => {
    setErrors((_errors) => ({
      ..._errors,
      [prop]: value
    }))
  }

  const nameValid = (value) => value.length >= 4
  const descriptionValid = (value) => value.length >= 4
  const priceValid = (value) => value && value >= 200 && value <= 10000

  return (
    <Box className={classes.sectionContainer} justifyContent="space-between">
      <Box component={'h3'} className={classes.sectionSubtitle}>
        Producto
      </Box>
      <Box className={classes.sectionContent}>
        <Box className={classes.inputContainer}>
          <TextField
            label="Nombre"
            variant="outlined"
            className={classes.input}
            value={data?.nombre || productData?.nombre}
            onChange={(e) => {
              setError(
                'nombre',
                !nameValid(e.target.value)
                  ? 'Debe ser mayor a cuatro carascteres'
                  : ''
              )
              updateProductData('nombre', e.target.value, { type: 'string' })
            }}
            onBlur={(e) => {
              updateProductData('nombre', e.target.value, { type: 'string' })
              setError(
                'nombre',
                !nameValid(e.target.value)
                  ? 'Debe ser mayor a cuatro carascteres'
                  : ''
              )
            }}
            error={errors['nombre'].length > 0}
            helperText={errors['nombre']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Descripcion"
            variant="outlined"
            className={classes.input}
            value={data?.descripcion || productData?.descripcion}
            onChange={(e) => {
              setError(
                'descripcion',
                !descriptionValid(e.target.value)
                  ? 'Debe ser mayor a cuatro carascteres'
                  : ''
              )
              updateProductData('descripcion', e.target.value, {
                type: 'string'
              })
            }}
            onBlur={(e) => {
              updateProductData('descripcion', e.target.value, {
                type: 'string'
              })
              setError(
                'descripcion',
                !descriptionValid(e.target.value)
                  ? 'Debe ser mayor a cuatro carascteres'
                  : ''
              )
            }}
            error={errors['descripcion'].length > 0}
            helperText={errors['descripcion']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Precio"
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.precio || productData?.precio}
            onChange={(e) => {
              setError(
                'precio',
                !priceValid(e.target.value)
                  ? 'Debe ser un valor entre $200 y $10000'
                  : ''
              )
              updateProductData('precio', e.target.value, { type: 'number' })
            }}
            onBlur={(e) => {
              updateProductData('precio', e.target.value, { type: 'number' })
              setError(
                'precio',
                !priceValid(e.target.value)
                  ? 'Debe ser un valor entre $200 y $10000'
                  : ''
              )
            }}
            error={errors['precio'].length > 0}
            helperText={errors['precio']}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default NewOrderProductData

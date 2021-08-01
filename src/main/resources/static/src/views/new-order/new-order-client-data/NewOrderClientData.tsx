import { Tooltip } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { HelpOutline } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import Cliente from 'src/model/Cliente'

const NewOrderClientData = ({ classes }) => {
  const [data, setData] = useState<Cliente>({
    nombre: '',
    apellido: '',
    dni: 0,
    telefono: '',
    email: ''
  })

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    email: ''
  })

  const {
    state: { clientData },
    dispatch
  } = useNewOrder()

  useEffect(() => {
    if (clientData) {
      setData(clientData)

      validateData()
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

  const updateClientData = (prop, value, { type }) => {
    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      [prop]: type === 'number' ? parseInt(value) : value
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateClientData,
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
    setError('nombre', !nameValid(clientData.nombre) ? 'Campo requerido' : '')

    setError(
      'apellido',
      !lastNameValid(clientData.apellido) ? 'Campo requerido' : ''
    )

    setError('dni', !dniValid(clientData.dni) ? 'El dni no es valido' : '')

    setError(
      'telefono',
      !telefonoValid(clientData.telefono) ? 'El telefono no es valido' : ''
    )

    setError(
      'email',
      !emailValid(clientData.email) ? 'El email no es valido' : ''
    )
  }

  const nameValid = (value) => value.length > 0
  const lastNameValid = (value) => value.length > 0
  const dniValid = (value) => /^(\d{7,8})$/.test(value.toString())
  const telefonoValid = (value) =>
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
      value
    )
  const emailValid = (value) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)

  return (
    <Box className={classes.sectionContainer}>
      <Box component={'h3'}>Cliente</Box>
      <Box className={classes.sectionContent}>
        <Box className={classes.inputContainer}>
          <TextField
            label="Nombre"
            variant="outlined"
            className={classes.input}
            value={data?.nombre || clientData?.nombre}
            onChange={(e) => {
              setError(
                'nombre',
                !nameValid(e.target.value) ? 'Campo requerido' : ''
              )
              updateClientData('nombre', e.target.value, { type: 'string' })
            }}
            onBlur={(e) => {
              updateClientData('nombre', e.target.value, { type: 'string' })
              setError(
                'nombre',
                !nameValid(e.target.value) ? 'Campo requerido' : ''
              )
            }}
            error={errors['nombre'].length > 0}
            helperText={errors['nombre']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Apellido"
            variant="outlined"
            className={classes.input}
            value={data?.apellido || clientData?.apellido}
            onChange={(e) => {
              setError(
                'apellido',
                !lastNameValid(e.target.value) ? 'Campo requerido' : ''
              )
              updateClientData('apellido', e.target.value, { type: 'string' })
            }}
            onBlur={(e) => {
              updateClientData('apellido', e.target.value, { type: 'string' })
              setError(
                'apellido',
                !lastNameValid(e.target.value) ? 'Campo requerido' : ''
              )
            }}
            error={errors['apellido'].length > 0}
            helperText={errors['apellido']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="DNI"
            type="number"
            variant="outlined"
            className={classes.input}
            value={data?.dni || clientData?.dni}
            onChange={(e) => {
              setError(
                'dni',
                !dniValid(e.target.value) ? 'El dni no es valido' : ''
              )
              updateClientData('dni', e.target.value, { type: 'number' })
            }}
            onBlur={(e) => {
              updateClientData('dni', e.target.value, { type: 'number' })
              setError(
                'dni',
                !dniValid(e.target.value) ? 'El dni no es valido' : ''
              )
            }}
            error={errors['dni'].length > 0}
            helperText={errors['dni']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Teléfono"
            variant="outlined"
            className={classes.input}
            value={data?.telefono || clientData?.telefono}
            onChange={(e) => {
              setError(
                'telefono',
                !telefonoValid(e.target.value) ? 'El telefono no es valido' : ''
              )
              updateClientData('telefono', e.target.value, { type: 'string' })
            }}
            onBlur={(e) => {
              updateClientData('telefono', e.target.value, { type: 'string' })
              setError(
                'telefono',
                !telefonoValid(e.target.value) ? 'El telefono no es valido' : ''
              )
            }}
            error={errors['telefono'].length > 0}
            helperText={errors['telefono']}
          />
        </Box>
        <Box className={classes.inputContainer}>
          <TextField
            label="Email"
            variant="outlined"
            className={classes.input}
            value={data?.email || clientData?.email}
            onChange={(e) => {
              setError(
                'email',
                !emailValid(e.target.value) ? 'El email no es valido' : ''
              )
              updateClientData('email', e.target.value, { type: 'string' })
            }}
            onBlur={(e) => {
              updateClientData('email', e.target.value, { type: 'string' })
              setError(
                'email',
                !emailValid(e.target.value) ? 'El email no es valido' : ''
              )
            }}
            error={errors['email'].length > 0}
            helperText={errors['email']}
          />
          <Tooltip title="Se usará para el envío de la alarma">
            <HelpOutline />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  )
}

export default NewOrderClientData

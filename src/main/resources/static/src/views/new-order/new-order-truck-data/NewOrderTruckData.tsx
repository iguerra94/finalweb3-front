import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Camion from 'src/model/Camion'
import { useEffect, useState } from 'react'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'

const NewOrderTruckData = ({ classes }) => {
  const [data, setData] = useState<Camion>({
    dominio: '',
    cisternaList: [{ capacidad: 0 }, { capacidad: 0 }],
    chofer: {
      nombre: '',
      apellido: '',
      dni: 0,
      telefono: ''
    }
  })

  const [errors, setErrors] = useState({
    dominio: '',
    chofer: {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: ''
    }
  })

  const {
    state: { truckData },
    dispatch
  } = useNewOrder()

  useEffect(() => {
    if (truckData) {
      setData(truckData)

      validateData()
    } else {
      dispatch({
        type: ActionType.UpdateBtnNextStepEnabledState,
        payload: {
          btnNextStepEnabled: false
        }
      })
    }

    if (!truckData.dominio) {
      generarCapacidadesAleatoriasCisternas(200, 2000)
    }
  }, [])

  const generarCapacidadesAleatoriasCisternas = (inf: number, sup: number) => {
    const capacidad1 = Math.floor(inf + Math.random() * (sup - inf))
    let capacidad2 = Math.floor(inf + Math.random() * (sup - inf))

    if (capacidad2 === capacidad1) {
      while (capacidad2 === capacidad1) {
        capacidad2 = Math.floor(inf + Math.random() * (sup - inf))
      }
    }

    setData((_data) => ({
      ..._data,
      cisternaList: [{ capacidad: capacidad1 }, { capacidad: capacidad2 }]
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        cisternaList: [{ capacidad: capacidad1 }, { capacidad: capacidad2 }]
      }
    })
  }

  useEffect(() => {
    dispatch({
      type: ActionType.UpdateBtnNextStepEnabledState,
      payload: {
        btnNextStepEnabled:
          errors.dominio.length === 0 &&
          Object.values(errors.chofer).every((value) => value.length === 0)
      }
    })
  }, [errors])

  const updateDomainData = (value) => {
    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      dominio: value
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        dominio: value
      }
    })
  }

  const updateChoferData = (prop, value, { type }) => {
    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      chofer: {
        ..._data.chofer,
        [prop]: type === 'number' ? parseInt(value) : value
      }
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        chofer: {
          ...data.chofer,
          [prop]: type === 'number' ? parseInt(value) : value
        }
      }
    })
  }

  const setDomainError = (value: string) => {
    setErrors((_errors) => ({
      ..._errors,
      dominio: value
    }))
  }

  const setChoferError = (prop: string, value: string) => {
    setErrors((_errors) => ({
      ..._errors,
      chofer: {
        ..._errors.chofer,
        [prop]: value
      }
    }))
  }

  const validateData = () => {
    setDomainError(
      !domainValid(truckData.dominio)
        ? 'Debe ser de la forma AAADDD ó AA111AA'
        : ''
    )

    setChoferError(
      'nombre',
      !nameValid(truckData.chofer.nombre) ? 'Campo requerido' : ''
    )

    setChoferError(
      'apellido',
      !lastNameValid(truckData.chofer.apellido) ? 'Campo requerido' : ''
    )

    setChoferError(
      'dni',
      !dniValid(truckData.chofer.dni) ? 'El dni no es valido' : ''
    )

    setChoferError(
      'telefono',
      !telefonoValid(truckData.chofer.telefono)
        ? 'El telefono no es valido'
        : ''
    )
  }

  const domainValid = (value) =>
    /^[a-zA-z]{3}[\d]{3}$/.test(value) ||
    /^[a-zA-z]{2}[\d]{3}[a-zA-z]{2}$/.test(value)
  const nameValid = (value) => value.length > 0
  const lastNameValid = (value) => value.length > 0
  const dniValid = (value) => /^(\d{7,8})$/.test(value.toString())
  const telefonoValid = (value) =>
    /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(
      value
    )

  return (
    <Box className={classes.sectionContainer} justifyContent="space-between">
      <Box component={'h3'}>Camion</Box>
      <Box className={classes.sectionContent}>
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs className={classes.gridItem}>
            <Typography>
              <strong>Datos basicos</strong>
            </Typography>
            <Box className={classes.inputContainer}>
              <TextField
                label="Dominio"
                variant="outlined"
                className={classes.inputWide}
                value={data?.dominio || truckData?.dominio}
                onChange={(e) => {
                  setDomainError(
                    !domainValid(e.target.value)
                      ? 'Debe ser de la forma AAADDD ó AA111AA'
                      : ''
                  )
                  updateDomainData(e.target.value)
                }}
                onBlur={(e) => {
                  setDomainError(
                    !domainValid(e.target.value)
                      ? 'Debe ser de la forma AAADDD ó AA111AA'
                      : ''
                  )
                  updateDomainData(e.target.value)
                }}
                error={errors['dominio'].length > 0}
                helperText={errors['dominio']}
              />
            </Box>
            <Typography>
              <strong>Cisternas</strong>
            </Typography>
            <Box className={classes.inputContainer}>
              <TextField
                label="Capacidad Cisterna #1"
                type="number"
                variant="outlined"
                className={classes.inputWide}
                value={
                  data?.cisternaList[0].capacidad ||
                  truckData?.cisternaList[0].capacidad
                }
                disabled
              />
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                label="Capacidad Cisterna #2"
                type="number"
                variant="outlined"
                className={classes.inputWide}
                value={
                  data?.cisternaList[1].capacidad ||
                  truckData?.cisternaList[1].capacidad
                }
                disabled
              />
            </Box>
          </Grid>
          <Grid item xs className={classes.gridItem}>
            <Typography>
              <strong>Chofer</strong>
            </Typography>
            <Box className={classes.inputContainer}>
              <TextField
                label="Nombre"
                variant="outlined"
                className={classes.inputWide}
                value={data?.chofer.nombre || truckData.chofer.nombre}
                onChange={(e) => {
                  setChoferError(
                    'nombre',
                    !nameValid(e.target.value) ? 'Campo requerido' : ''
                  )
                  updateChoferData('nombre', e.target.value, { type: 'string' })
                }}
                onBlur={(e) => {
                  updateChoferData('nombre', e.target.value, { type: 'string' })
                  setChoferError(
                    'nombre',
                    !nameValid(e.target.value) ? 'Campo requerido' : ''
                  )
                }}
                error={errors.chofer['nombre'].length > 0}
                helperText={errors.chofer['nombre']}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                label="Apellido"
                variant="outlined"
                className={classes.inputWide}
                value={data?.chofer.apellido || truckData?.chofer.apellido}
                onChange={(e) => {
                  setChoferError(
                    'apellido',
                    !lastNameValid(e.target.value) ? 'Campo requerido' : ''
                  )
                  updateChoferData('apellido', e.target.value, {
                    type: 'string'
                  })
                }}
                onBlur={(e) => {
                  updateChoferData('apellido', e.target.value, {
                    type: 'string'
                  })
                  setChoferError(
                    'apellido',
                    !lastNameValid(e.target.value) ? 'Campo requerido' : ''
                  )
                }}
                error={errors.chofer['apellido'].length > 0}
                helperText={errors.chofer['apellido']}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                label="DNI"
                type="number"
                variant="outlined"
                className={classes.inputWide}
                value={data?.chofer.dni || truckData?.chofer.dni}
                onChange={(e) => {
                  setChoferError(
                    'dni',
                    !dniValid(e.target.value) ? 'El dni no es valido' : ''
                  )
                  updateChoferData('dni', e.target.value, { type: 'number' })
                }}
                onBlur={(e) => {
                  updateChoferData('dni', e.target.value, { type: 'number' })
                  setChoferError(
                    'dni',
                    !dniValid(e.target.value) ? 'El dni no es valido' : ''
                  )
                }}
                error={errors.chofer['dni'].length > 0}
                helperText={errors.chofer['dni']}
              />
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                label="Teléfono"
                variant="outlined"
                className={classes.inputWide}
                value={data?.chofer.telefono || truckData?.chofer.telefono}
                onChange={(e) => {
                  setChoferError(
                    'telefono',
                    !telefonoValid(e.target.value)
                      ? 'El telefono no es valido'
                      : ''
                  )
                  updateChoferData('telefono', e.target.value, {
                    type: 'string'
                  })
                }}
                onBlur={(e) => {
                  updateChoferData('telefono', e.target.value, {
                    type: 'string'
                  })
                  setChoferError(
                    'telefono',
                    !telefonoValid(e.target.value)
                      ? 'El telefono no es valido'
                      : ''
                  )
                }}
                error={errors.chofer['telefono'].length > 0}
                helperText={errors.chofer['telefono']}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default NewOrderTruckData

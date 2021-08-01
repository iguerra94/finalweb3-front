import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Camion from 'src/model/Camion'
import { useEffect, useState } from 'react'
import { ActionType } from 'src/context/new-order/reducer/new-order-actions'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'
import Button from '@material-ui/core/Button'

const NewOrderTruckData = ({ classes }) => {
  const [data, setData] = useState<Camion>({
    dominio: '',
    cisternas: {
      cisterna1: 0,
      cisterna2: 0,
      cisterna3: 0,
      cisterna4: 0
    },
    cisternaList: [{ capacidad: 0 }],
    chofer: {
      nombre: '',
      apellido: '',
      dni: 0,
      telefono: ''
    }
  })
  const [cantidadCisternas, setCantidadCisternas] = useState<number>(1)

  const [errors, setErrors] = useState({
    dominio: '',
    cisternas: {
      cisterna1: '',
      cisterna2: '',
      cisterna3: '',
      cisterna4: ''
    },
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

      const cantCisternas = Object.values(truckData.cisternas!).filter(
        (value) => value !== 0
      ).length
      setCantidadCisternas(cantCisternas !== 0 ? cantCisternas : 1)

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
        btnNextStepEnabled:
          errors.dominio.length === 0 &&
          Object.values(errors.chofer).every((value) => value.length === 0) &&
          Object.values(errors.cisternas)
            .slice(0, cantidadCisternas)
            .every((value) => value.length === 0)
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

  const updateCisternaElementData = (prop, value, index) => {
    const cisternaListUpdated = data.cisternaList!.map((cisterna, i) =>
      i === index
        ? { capacidad: value === '' ? '' : parseInt(value) }
        : cisterna
    )

    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      cisternas: {
        ..._data.cisternas!,
        [prop]: value === '' ? '' : parseInt(value)
      },
      cisternaList: cisternaListUpdated
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        cisternas: {
          ...data.cisternas!,
          [prop]: value === '' ? '' : parseInt(value)
        },
        cisternaList: cisternaListUpdated
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

  const setCisternaError = (prop: string, value: string) => {
    setErrors((_errors) => ({
      ..._errors,
      cisternas: {
        ..._errors.cisternas,
        [prop]: value
      }
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

    setCisternaError(
      'cisterna1',
      !cisternaValid(truckData.cisternas!.cisterna1)
        ? 'Debe ser un valor entre 1 y 10000'
        : ''
    )

    setCisternaError(
      'cisterna2',
      !cisternaValid(truckData.cisternas!.cisterna2)
        ? 'Debe ser un valor entre 1 y 10000'
        : ''
    )

    setCisternaError(
      'cisterna3',
      !cisternaValid(truckData.cisternas!.cisterna3)
        ? 'Debe ser un valor entre 1 y 10000'
        : ''
    )

    setCisternaError(
      'cisterna4',
      !cisternaValid(truckData.cisternas!.cisterna4)
        ? 'Debe ser un valor entre 1 y 10000'
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
  const cisternaValid = (value) =>
    parseInt(value) >= 1 && parseInt(value) <= 10000

  const agregarCisterna = () => {
    if (cantidadCisternas >= 4) return

    const cisternaListUpdated = [...data.cisternaList!, { capacidad: 0 }]

    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      cisternaList: cisternaListUpdated
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        cisternaList: cisternaListUpdated
      }
    })

    setCantidadCisternas((prev) => prev + 1)
  }

  const decidirCualCisternaBorrar = () => {
    if (cantidadCisternas === 2) {
      return 'cisterna2'
    }
    if (cantidadCisternas === 3) {
      return 'cisterna3'
    }
    if (cantidadCisternas === 4) {
      return 'cisterna4'
    }
    return ''
  }

  const quitarCisterna = () => {
    if (cantidadCisternas <= 1) return

    const prop = decidirCualCisternaBorrar()

    data.cisternaList!.pop()

    // Update local NewOrder state
    setData((_data) => ({
      ..._data,
      cisternas: {
        ..._data.cisternas!,
        [prop]: 0
      },
      cisternaList: data.cisternaList!
    }))

    // Update NewOrder context state
    dispatch({
      type: ActionType.UpdateTruckData,
      payload: {
        ...data,
        cisternas: {
          ...data.cisternas!,
          [prop]: 0
        },
        cisternaList: data.cisternaList!
      }
    })

    setCantidadCisternas((prev) => prev - 1)
  }

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
            <Box>
              <Typography>
                <strong>Cisternas</strong>
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                marginTop="1rem"
                marginBottom="1rem"
              >
                <Typography style={{ marginRight: '8px' }}>
                  Cantidad:
                </Typography>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '25px', width: '25px', height: '25px' }}
                    onClick={quitarCisterna}
                    disabled={cantidadCisternas === 1}
                    title="Quitar cisterna"
                  >
                    -
                  </Button>
                  <Typography style={{ marginLeft: '8px', marginRight: '8px' }}>
                    {cantidadCisternas}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ minWidth: '25px', width: '25px', height: '25px' }}
                    onClick={agregarCisterna}
                    disabled={cantidadCisternas === 4}
                    title="Agregar cisterna"
                  >
                    +
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* Cisterna #1 */}
            <Box className={classes.inputContainer}>
              <TextField
                label={`Capacidad Cisterna #1`}
                type="number"
                variant="outlined"
                className={classes.inputWide}
                value={
                  data.cisternas?.cisterna1 || truckData?.cisternas?.cisterna1
                }
                onChange={(e) => {
                  setCisternaError(
                    'cisterna1',
                    !cisternaValid(e.target.value)
                      ? 'Debe ser un valor entre 1 y 10000'
                      : ''
                  )
                  updateCisternaElementData('cisterna1', e.target.value, 0)
                }}
                onBlur={(e) => {
                  setCisternaError(
                    'cisterna1',
                    !cisternaValid(e.target.value)
                      ? 'Debe ser un valor entre 1 y 10000'
                      : ''
                  )
                  updateCisternaElementData('cisterna1', e.target.value, 0)
                }}
                error={errors.cisternas.cisterna1.length > 0}
                helperText={errors.cisternas.cisterna1}
              />
            </Box>

            {/* Cisterna #2 */}
            {cantidadCisternas >= 2 ? (
              <Box className={classes.inputContainer}>
                <TextField
                  label={`Capacidad Cisterna #2`}
                  type="number"
                  variant="outlined"
                  className={classes.inputWide}
                  value={
                    data.cisternas?.cisterna2 || truckData?.cisternas?.cisterna2
                  }
                  onChange={(e) => {
                    setCisternaError(
                      'cisterna2',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna2', e.target.value, 1)
                  }}
                  onBlur={(e) => {
                    setCisternaError(
                      'cisterna2',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna2', e.target.value, 1)
                  }}
                  error={errors.cisternas.cisterna2.length > 0}
                  helperText={errors.cisternas.cisterna2}
                />
              </Box>
            ) : null}

            {/* Cisterna #3 */}
            {cantidadCisternas >= 3 ? (
              <Box className={classes.inputContainer}>
                <TextField
                  label={`Capacidad Cisterna #3`}
                  type="number"
                  variant="outlined"
                  className={classes.inputWide}
                  value={
                    data.cisternas?.cisterna3 || truckData?.cisternas?.cisterna3
                  }
                  onChange={(e) => {
                    setCisternaError(
                      'cisterna3',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna3', e.target.value, 2)
                  }}
                  onBlur={(e) => {
                    setCisternaError(
                      'cisterna3',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna3', e.target.value, 2)
                  }}
                  error={errors.cisternas.cisterna3.length > 0}
                  helperText={errors.cisternas.cisterna3}
                />
              </Box>
            ) : null}

            {/* Cisterna #4 */}
            {cantidadCisternas >= 4 ? (
              <Box className={classes.inputContainer}>
                <TextField
                  label={`Capacidad Cisterna #4`}
                  type="number"
                  variant="outlined"
                  className={classes.inputWide}
                  value={
                    data.cisternas?.cisterna4 || truckData?.cisternas?.cisterna4
                  }
                  onChange={(e) => {
                    setCisternaError(
                      'cisterna4',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna4', e.target.value, 3)
                  }}
                  onBlur={(e) => {
                    setCisternaError(
                      'cisterna4',
                      !cisternaValid(e.target.value)
                        ? 'Debe ser un valor entre 1 y 10000'
                        : ''
                    )
                    updateCisternaElementData('cisterna4', e.target.value, 3)
                  }}
                  error={errors.cisternas.cisterna4.length > 0}
                  helperText={errors.cisternas.cisterna4}
                />
              </Box>
            ) : null}
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

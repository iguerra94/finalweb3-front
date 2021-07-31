import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'

import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import TextField from '@material-ui/core/TextField'
import useStyles from './LoadPumpPasswordInputStyles'
import orderService from 'src/service/orderService'
import { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Orden from 'src/model/Orden'
import FormControl from '@material-ui/core/FormControl'

const LoadPumpPasswordInput = () => {
  const classes = useStyles()
  const [isValidatingPassword, setIsValidatingPassword] =
    useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

  const [passwordError, setPasswordError] = useState('')

  const {
    state: {
      modalData: { modalDynamicData }
    },
    dispatch
  } = useUI()

  useEffect(() => {
    validateData()
  }, [])

  const validateData = () => {
    setPasswordError(
      !passwordValid(password) ? 'Debe contener 5 caracteres' : ''
    )
  }

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  const checkIfPasswordIsValid = async () => {
    try {
      setIsValidatingPassword(true)

      const order: Orden = await orderService.getOrderById(
        modalDynamicData.idOrden
      )

      if (order.password !== password) {
        throw new Error('La password ingresada no coincide con la de la orden')
      }

      setTimeout(() => {
        setIsValidatingPassword(false)

        dispatch({
          type: ActionType.CloseModal
        })

        dispatch({
          type: ActionType.OpenSnackbar,
          payload: {
            message: `Ha comenzado la carga del surtidor en la orden #${modalDynamicData.numeroOrden}`,
            severity: 'success'
          }
        })
      }, 500)

      setTimeout(() => {
        dispatch({
          type: ActionType.CloseSnackbar
        })
      }, 5000)
    } catch (e) {
      setTimeout(() => {
        setIsValidatingPassword(false)

        setPasswordError(e.message)
      }, 500)
    }
  }

  const passwordValid = (value) => value.length === 5

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          Ingresa la password para iniciar la carga
        </DialogContentText>
        <form noValidate>
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-text"
              label="Password"
              type="text"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPasswordError(
                  !passwordValid(e.target.value)
                    ? 'Debe contener 5 caracteres'
                    : ''
                )
                setPassword(e.target.value)
              }}
              onBlur={(e) => {
                setPasswordError(
                  !passwordValid(e.target.value)
                    ? 'Debe contener 5 caracteres'
                    : ''
                )
                setPassword(e.target.value)
              }}
              error={passwordError.length > 0}
              helperText={passwordError}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={(e) => {
            e.stopPropagation()

            checkIfPasswordIsValid()
          }}
          variant="contained"
          color="primary"
          disabled={passwordError.length > 0 || isValidatingPassword}
        >
          {isValidatingPassword ? (
            <CircularProgress size={14} style={{ position: 'absolute' }} />
          ) : null}
          Iniciar carga
        </Button>
      </DialogActions>
    </>
  )
}

export default LoadPumpPasswordInput

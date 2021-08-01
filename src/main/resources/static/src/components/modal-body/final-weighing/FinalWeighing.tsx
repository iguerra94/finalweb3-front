import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import TextField from '@material-ui/core/TextField'
import useStyles from './FinalWeighingStyles'
import orderService from 'src/service/orderService'
import { useEffect, useState } from 'react'
import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const PostFinalWeighingMessage = React.lazy(
  () =>
    import(
      'src/components/modal-body/post-final-weighing-message/PostFinalWeighingMessage'
    )
)

const FinalWeighing = () => {
  const classes = useStyles()
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [weighing, setWeighing] = useState<number>(0)

  const [weighingError, setWeighingError] = useState('')

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
    setWeighingError(
      !weighingValid(weighing) ? 'Debe ser un valor entre 1 y 40000' : ''
    )
  }

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

  const saveFinalWeighing = async () => {
    try {
      setIsUpdating(true)
      const weighingData = {
        idOrden: modalDynamicData.numeroOrden,
        peso: weighing
      }

      await orderService.updateFinalWeighing(weighingData)

      setTimeout(() => {
        setIsUpdating(false)

        dispatch({
          type: ActionType.CloseModal
        })

        dispatch({
          type: ActionType.OpenModal,
          payload: {
            modalBody: PostFinalWeighingMessage,
            modalTitle: 'Pesaje final exitoso'
          }
        })
      }, 500)
    } catch (e) {
      setIsUpdating(false)
      setWeighingError(
        'Ocurrió un error al actualizar el pesaje final de la orden'
      )
    }
  }

  const weighingValid = (value) =>
    parseInt(value) >= 1 && parseInt(value) <= 40000

  return (
    <>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>Ingresa el pesaje final</DialogContentText>
        <form noValidate>
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-number"
              label="Pesaje final"
              type="number"
              variant="outlined"
              value={weighing}
              onChange={(e) => {
                setWeighingError(
                  !weighingValid(e.target.value)
                    ? 'Debe ser un valor entre 1 y 40000'
                    : ''
                )
                setWeighing(parseInt(e.target.value))
              }}
              onBlur={(e) => {
                setWeighingError(
                  !weighingValid(e.target.value)
                    ? 'Debe ser un valor entre 1 y 40000'
                    : ''
                )
                setWeighing(parseInt(e.target.value))
              }}
              error={weighingError.length > 0}
              helperText={weighingError}
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={(e) => {
            e.stopPropagation()
            saveFinalWeighing()
          }}
          variant="contained"
          color="primary"
          disabled={weighingError.length > 0 || isUpdating}
        >
          {isUpdating ? (
            <CircularProgress size={14} style={{ position: 'absolute' }} />
          ) : null}
          Guardar
        </Button>
      </DialogActions>
    </>
  )
}

export default FinalWeighing

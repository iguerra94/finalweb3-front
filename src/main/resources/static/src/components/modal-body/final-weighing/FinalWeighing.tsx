import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import { useUI } from 'src/context/ui/UIContext'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

import TextField from '@material-ui/core/TextField'
import useStyles from './FinalWeighingStyles'

const FinalWeighing = () => {
  const classes = useStyles()

  const { dispatch } = useUI()

  const handleClose = () => {
    dispatch({ type: ActionType.CloseModal })
  }

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
            />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </>
  )
}

export default FinalWeighing

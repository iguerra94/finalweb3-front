import Snackbar from '@material-ui/core/Snackbar'
import { useUI } from 'src/context/ui/UIContext'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    zIndex: 2,
    width: 'auto',
    cursor: 'default'
  }
}))

const CustomSnackbar: React.FC = () => {
  const classes = useStyles()
  const {
    state: { snackbarData }
  } = useUI()

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarData.snackbarOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbarData.severity}>{snackbarData.message}</Alert>
      </Snackbar>
    </div>
  )
}

export default CustomSnackbar

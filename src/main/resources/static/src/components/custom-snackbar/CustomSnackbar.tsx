import Snackbar from '@material-ui/core/Snackbar'
import { useUI } from 'src/context/ui/UIContext'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up" />
}

const CustomSnackbar: React.FC = () => {
  const {
    state: { snackbarData }
  } = useUI()

  return (
    <Snackbar
      open={snackbarData.snackbarOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
      key={'bottom-right'}
    >
      <Alert severity={snackbarData.severity}>{snackbarData.message}</Alert>
    </Snackbar>
  )
}

export default CustomSnackbar

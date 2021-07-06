import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const loginStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },
    appTitle: {
      position: 'absolute',
      left: '1rem',
      top: '1rem',
      color: 'white',
      zIndex: 2
    },
    topBox: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      height: '45vh',
      backgroundColor: theme.palette.info.main,
      borderRadius: 0
    },
    loginBox: {
      display: 'flex',
      flexDirection: 'column',
      minWidth: '400px',
      maxWidth: '400px',
      minHeight: '400px',
      maxHeight: '400px',
      zIndex: 2
    },
    loginBoxTitle: {
      height: '70px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    form: {
      padding: '10px 40px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    loginBoxContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    item: {
      width: '100%'
    },
    input: {
      width: '100%'
    },
    button: {
      position: 'relative',
      width: '100%'
    },
    progress: {
      position: 'absolute'
    },
    response: {
      width: '300px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      position: 'relative',
      bottom: '-12px'
    },
    failure: { color: '#e53935' }
  })
)

export default loginStyles

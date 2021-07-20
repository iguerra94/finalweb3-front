import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }
  })
)

export default useStyles

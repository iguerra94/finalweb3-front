import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles(() =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingSm: { height: '100%', margin: '8px' }
  })
)

export default useStyles

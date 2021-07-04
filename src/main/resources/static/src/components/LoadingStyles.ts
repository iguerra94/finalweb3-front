import { makeStyles } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const styles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }
  })
)

export default styles

import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  })
)

export default useStyles

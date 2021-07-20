import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100px',
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1rem'
    },
    stepperRoot: {
      width: '50%',
      padding: '8px 0'
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    actionButtons: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      columnGap: '1rem'
    }
  })
)

export default useStyles

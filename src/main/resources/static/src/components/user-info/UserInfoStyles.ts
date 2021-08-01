import { makeStyles, Theme } from '@material-ui/core'
import { createStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: '16px',
      cursor: 'default'
    },
    subtitle: {
      fontSize: '12px',
      color: 'rgba(0,0,0,.5)',
      cursor: 'default'
    }
  })
)

export default useStyles

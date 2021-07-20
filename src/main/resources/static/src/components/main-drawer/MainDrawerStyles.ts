import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    appTitle: {
      position: 'absolute',
      left: '1rem',
      top: '1rem',
      zIndex: 2
    },
    normal: {
      backgroundColor: 'rgba(196, 196, 196, 0)',
      borderLeft: '3px inset transparent'
    },
    selected: {
      backgroundColor: 'rgba(196, 196, 196, 0.3)',
      borderLeft: '3px inset #333333'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  })
)

export default useStyles

import { Box, CircularProgress } from '@material-ui/core'
import styles from './LoadingStyles'

const Loading = () => {
  const classes = styles()

  return (
    <Box className={classes.container}>
      <CircularProgress size={32} thickness={4} />
    </Box>
  )
}

export default Loading

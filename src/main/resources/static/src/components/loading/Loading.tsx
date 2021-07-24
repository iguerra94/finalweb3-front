import { Box, CircularProgress } from '@material-ui/core'
import useStyles from './LoadingStyles'

interface Props {
  className?: string
  size?: number
  thickness?: number
}

const Loading = ({ className, size = 32, thickness = 4 }: Props) => {
  const classes = useStyles()

  return (
    <Box className={className ? className : classes.container}>
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  )
}

export default Loading

import { Box, CircularProgress } from '@material-ui/core'

interface Props {
  className?: string
  style?: React.CSSProperties
  size?: number
  thickness?: number
}

const Loading = ({ className, style, size = 32, thickness = 4 }: Props) => {
  return (
    <Box style={style} className={className ? className : undefined}>
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  )
}

export default Loading

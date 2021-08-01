import useStyles from './UserInfoStyles'
import User from 'src/model/User'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

interface Props {
  data: User
}

const UserInfo = ({ data }: Props) => {
  const classes = useStyles()

  return (
    <Box>
      <Typography className={classes.title}>
        {data.name} {data.lastName}
      </Typography>
      <Typography className={classes.subtitle}>
        {data.roles![0].name}
      </Typography>
    </Box>
  )
}

export default UserInfo

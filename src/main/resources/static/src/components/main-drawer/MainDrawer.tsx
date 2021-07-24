import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import ListIcon from '@material-ui/icons/List'
import useStyles from './MainDrawerStyles'
import Drawer from '@material-ui/core/Drawer'
import { WrapperComponent } from 'src/utils/render-utils'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import { useHistory } from 'react-router-dom'
import { ROUTES } from 'src/config/router/routes'
import { useNewOrder } from 'src/context/new-order/NewOrderContext'

const MainDrawer = () => {
  const classes = useStyles()

  const {
    state: { newOrderUIData }
  } = useNewOrder()

  const history = useHistory()

  const drawerItems = [
    {
      icon: AddIcon,
      text: 'Nueva orden',
      pathUrl: ROUTES.PrivateRoutes.NewOrder.pathUrl(),
      shouldRender: true
    },
    {
      icon: ListIcon,
      text: 'Ordenes',
      pathUrl: ROUTES.PrivateRoutes.OrderList.pathUrl(),
      shouldRender: !newOrderUIData.creatingNewOrder
    }
  ]

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Box component={'h1'} className={classes.appTitle}>
          Final IW3
        </Box>
        <div className={classes.toolbar} />
        <Divider />
        <List style={{ marginTop: '2rem' }}>
          {drawerItems.map((item) =>
            item.shouldRender ? (
              <ListItem
                key={item.text}
                selected={history.location.pathname.includes(item.pathUrl)}
                className={
                  history.location.pathname.includes(item.pathUrl)
                    ? classes.selected
                    : classes.normal
                }
                onClick={() => {
                  history.replace(item.pathUrl)
                }}
                button
              >
                <ListItemIcon>{WrapperComponent(item.icon)}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ) : null
          )}
        </List>
      </Drawer>
    </div>
  )
}

export default MainDrawer

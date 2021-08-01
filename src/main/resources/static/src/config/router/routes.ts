import React from 'react'
import { USER_ROLES } from 'src/utils/user-utils'

const NewOrder = React.lazy(() => import('src/views/new-order/NewOrder'))
const OrderList = React.lazy(
  () => import('src/views/orders/order-list/OrderList')
)
const OrderDetail = React.lazy(
  () => import('src/views/orders/order-detail/OrderDetail')
)

export interface CustomPrivateRouteProps {
  pathUrl: () => string | string
  pathTitle?: string
  component?: React.LazyExoticComponent<React.FC<{}>>
  hasRenderCondition?: boolean
  renderCondition?: (role: string) => boolean
}

export const ROUTES = {
  Root: { pathUrl: '/' },
  Login: { pathUrl: '/login', pathTitle: 'Login' },
  PrivateRoutes: {
    NewOrder: {
      pathUrl: () => '/new',
      pathTitle: 'Nueva orden',
      component: NewOrder,
      hasRenderCondition: true,
      renderCondition: (role: string) => role === USER_ROLES.ADMIN
    },
    OrderList: {
      pathUrl: () => '/order',
      pathTitle: 'Lista de ordenes',
      component: OrderList
    },
    OrderDetail: {
      pathUrl: (id?: string) => `/order/${id ? `${id}` : ':id'}`,
      pathTitle: `Detalle de orden`,
      component: OrderDetail
    }
  }
}

import React from 'react'

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
}

export const ROUTES = {
  Root: { pathUrl: '/' },
  Login: { pathUrl: '/login', pathTitle: 'Login' },
  PrivateRoutes: {
    NewOrder: {
      pathUrl: () => '/new',
      pathTitle: 'Nueva orden',
      component: NewOrder
    },
    OrderList: {
      pathUrl: () => '/order',
      pathTitle: 'Lista de ordenes',
      component: OrderList
    },
    OrderDetail: {
      pathUrl: (orderId?: string) => `/order/${orderId ? `${orderId}` : ':id'}`,
      pathTitle: `Detalle de orden`,
      component: OrderDetail
    }
  }
}

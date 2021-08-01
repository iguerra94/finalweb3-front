import { createContext, useContext, useReducer } from 'react'
import { ordersLoadReducer } from './reducer'
import { OrdersLoadActions } from './reducer/orders-load-actions'
import {
  initialOrdersLoadState,
  OrdersLoadState
} from './reducer/orders-load-state'

type OrdersLoadContextType = {
  state: OrdersLoadState
  dispatch: React.Dispatch<OrdersLoadActions>
}

const OrdersLoadContext = createContext<OrdersLoadContextType>({
  state: initialOrdersLoadState,
  dispatch: () => {}
})

export const useOrdersLoad = () => useContext(OrdersLoadContext)

export const OrdersLoadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    ordersLoadReducer,
    initialOrdersLoadState
  )

  return (
    <OrdersLoadContext.Provider value={{ state, dispatch }}>
      {children}
    </OrdersLoadContext.Provider>
  )
}

import { ActionType, OrdersLoadActions } from './orders-load-actions'
import { OrdersLoadState } from './orders-load-state'

export const ordersLoadReducer = (
  state: OrdersLoadState,
  action: OrdersLoadActions
) => {
  switch (action.type) {
    case ActionType.UpdateOrdersLoadList: {
      const { payload } = action
      return {
        ...state,
        orders: payload
      }
    }
    default:
      throw new Error(`Invalid action type: ${action}`)
  }
}

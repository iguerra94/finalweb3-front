import { ActionType, NewOrderActions } from './new-order-actions'
import { initialNewOrderState, NewOrderState } from './new-order-state'

export const newOrderReducer = (
  state: NewOrderState,
  action: NewOrderActions
) => {
  switch (action.type) {
    case ActionType.UpdateBasicData: {
      const { payload } = action
      return {
        ...state,
        basicData: { ...payload }
      }
    }
    case ActionType.UpdateTruckData: {
      const { payload } = action
      return {
        ...state,
        truckData: { ...payload }
      }
    }
    case ActionType.UpdateClientData: {
      const { payload } = action
      return {
        ...state,
        clientData: { ...payload }
      }
    }
    case ActionType.UpdateProductData: {
      const { payload } = action
      return {
        ...state,
        productData: { ...payload }
      }
    }
    case ActionType.UpdateBtnNextStepEnabledState: {
      const { payload } = action
      return {
        ...state,
        newOrderUIData: {
          ...state.newOrderUIData,
          btnNextStepEnabled: payload.btnNextStepEnabled
        }
      }
    }
    case ActionType.UpdateBtnCreateOrderClickHandler: {
      const { payload } = action
      return {
        ...state,
        newOrderUIData: {
          ...state.newOrderUIData,
          btnCreateOrderClickHandler: payload.btnCreateOrderClickHandler
        }
      }
    }
    case ActionType.UpdateCreatingNewOrderState: {
      const { payload } = action
      return {
        ...state,
        newOrderUIData: {
          ...state.newOrderUIData,
          creatingNewOrder: payload.creatingNewOrder
        }
      }
    }
    case ActionType.ClearNewOrderData: {
      return initialNewOrderState
    }
    default:
      throw new Error(`Invalid action type: ${action}`)
  }
}

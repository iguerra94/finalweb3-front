import PumpOrderData from 'src/model/dto/PumpOrderData'

export enum ActionType {
  UpdateOrdersLoadList
}

export interface UpdateOrdersLoadList {
  type: ActionType.UpdateOrdersLoadList
  payload: PumpOrderData[]
}

export type OrdersLoadActions = UpdateOrdersLoadList

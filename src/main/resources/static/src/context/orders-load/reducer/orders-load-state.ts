import PumpOrderData from 'src/model/dto/PumpOrderData'

export interface OrdersLoadState {
  orders: PumpOrderData[]
}

export const initialOrdersLoadState: OrdersLoadState = {
  orders: []
}

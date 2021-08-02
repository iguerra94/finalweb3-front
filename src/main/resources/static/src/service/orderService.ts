import api from 'src/api/api'
import NewOrderCreationData from 'src/model/dto/NewOrderCreationData'
import PumpOrderData from 'src/model/dto/PumpOrderData'
import UpdateEmailSendData from 'src/model/dto/UpdateEmailSendData'
import WeighingData from 'src/model/dto/WeighingData'

class OrderService {
  public async getOrders() {
    return api.order.getOrders().then((results) => results.data)
  }

  public async getOrderById(id: number) {
    return api.order.getOrderById(id).then((result) => result.data)
  }

  public async addOrder(order: NewOrderCreationData) {
    return api.order.addOrder(order)
  }

  public async updateInitialWeighing(data: WeighingData) {
    return api.order.updateInitialWeighing(data).then((result) => result.data)
  }

  public async updatePump(data: PumpOrderData) {
    return api.order.updatePump(data).then((result) => result.data)
  }

  public async updateFinalWeighing(data: WeighingData) {
    return api.order.updateFinalWeighing(data).then((result) => result.data)
  }

  public async updateEmailSend(data: UpdateEmailSendData) {
    return api.order.updateEmailSend(data).then((result) => result.data)
  }

  public async closeOrder(data: PumpOrderData) {
    return api.order.closeOrder(data).then((result) => result.data)
  }
}

export default new OrderService()

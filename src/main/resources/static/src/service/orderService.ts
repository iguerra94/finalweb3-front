import api from 'src/api/api'
import NewOrderCreationData from 'src/model/dto/NewOrderCreationData'

class OrderService {
  public async getOrders() {
    return api.order.getOrders().then((results) => results.data)
  }

  public async addOrder(order: NewOrderCreationData) {
    return api.order.addOrder(order)
  }
}

export default new OrderService()

import api from 'src/api/api'

class ProductService {
  public async getProducts() {
    return api.product.getProducts().then((results) => results.data)
  }
}

export default new ProductService()

import api from 'src/api/api'

class TruckService {
  public async getTrucks() {
    return api.truck.getTrucks().then((results) => {
      return results.data
    })
  }
}

export default new TruckService()

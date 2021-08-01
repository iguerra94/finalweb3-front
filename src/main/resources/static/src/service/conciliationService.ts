import api from 'src/api/api'

class ConciliationService {
  public async getConciliationByOrderNumber(numeroOrden: string) {
    return api.conciliation
      .getConciliationByOrderNumber(numeroOrden)
      .then((result) => result.data)
  }
}

export default new ConciliationService()

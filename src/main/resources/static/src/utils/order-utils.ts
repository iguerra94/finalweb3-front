class OrderUtils {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {}

  public generateRandomValues() {
    let masaAcumulada = Math.round(200 + Math.random() * (500 - 200))
    let temperatura = Math.round(25 + Math.random() * (50 - 25))

    return {
      masaAcumulada,
      temperatura
    }
  }
}

export default new OrderUtils()

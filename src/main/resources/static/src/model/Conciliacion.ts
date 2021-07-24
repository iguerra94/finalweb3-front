interface Conciliacion {
  id: number
  numeroOrden: string
  productoCargado: number
  densidad: number
  temperatura: number
  caudal: number
  pesajeInicial: number
  pesajeFinal: number
  netoBalanza: number
  diferenciaBalanzaCaudalimetro: number
}

export default Conciliacion

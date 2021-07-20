import Camion from '../Camion'
import Cliente from '../Cliente'
import Producto from '../Producto'

interface NewOrderCreationData {
  numeroOrden: string
  fechaPrevistaCarga: Date | string
  tiempoAlmacenaje: number
  preset: number
  camion: Camion
  cliente: Cliente
  producto: Producto
}

export default NewOrderCreationData

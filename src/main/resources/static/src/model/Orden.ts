import Camion from './Camion'
import Cliente from './Cliente'
import Conciliacion from './Conciliacion'
import Producto from './Producto'

interface Orden {
  id: number
  numeroOrden: string
  camion: Camion
  cliente: Cliente
  producto: Producto
  conciliacion?: Conciliacion
  masaAcumulada: number
  densidad: number
  temperatura: number
  caudal: number
  fechaUltimoAlmacenamiento?: Date
  preset: number
  estado: number
  fechaGeneracionOrden: Date
  fechaPrevistaCarga: Date
  password: string
  pesajeInicial?: number
  fechaPesajeInicial?: Date
  tiempoAlmacenaje: number
  pesajeFinal?: number
  fechaPesajeFinal?: Date
  envioMail: number
}

export default Orden

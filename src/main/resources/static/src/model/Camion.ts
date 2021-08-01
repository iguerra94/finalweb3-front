import Chofer from './Chofer'
import Cisterna from './Cisterna'

interface Camion {
  id?: number
  dominio: string
  cisternas?: {
    cisterna1: any
    cisterna2: any
    cisterna3: any
    cisterna4: any
  }
  cisternaList?: Cisterna[]
  chofer: Chofer
}

export default Camion

import Chofer from './Chofer'
import Cisterna from './Cisterna'

interface Camion {
  id?: number
  dominio: string
  cisternaList: Cisterna[]
  chofer: Chofer
}

export default Camion

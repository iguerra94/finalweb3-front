import moment from 'moment'
import Chofer from 'src/model/Chofer'
import Cisterna from 'src/model/Cisterna'

export interface NewOrderState {
  basicData: BasicData
  truckData: TruckData
  clientData: ClientData
  productData: ProductData
  newOrderUIData: NewOrderUIData
}

export interface BasicData {
  numeroOrden: string
  fechaPrevistaCarga: string
  tiempoAlmacenaje: number
  preset: number
}

interface TruckData {
  dominio: string
  cisternaList: Cisterna[]
  chofer: Chofer
}

interface ClientData {
  nombre: string
  apellido: string
  dni: number
  telefono: string
  email: string
}

interface ProductData {
  nombre: string
  descripcion: string
  precio: number
}

export interface NewOrderUIData {
  btnNextStepEnabled?: boolean
  btnCreateOrderClickHandler?: () => void
  creatingNewOrder?: boolean
}

export const initialNewOrderState: NewOrderState = {
  basicData: {
    numeroOrden: '',
    fechaPrevistaCarga: moment()
      .add('3', 'minutes')
      .format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS),
    tiempoAlmacenaje: 1,
    preset: 500
  },
  truckData: {
    dominio: '',
    cisternaList: [{ capacidad: 0 }, { capacidad: 0 }],
    chofer: { nombre: '', apellido: '', dni: 0, telefono: '' }
  },
  clientData: { nombre: '', apellido: '', dni: 0, telefono: '', email: '' },
  productData: { nombre: '', descripcion: '', precio: 0 },
  newOrderUIData: {
    btnNextStepEnabled: false,
    btnCreateOrderClickHandler: undefined,
    creatingNewOrder: false
  }
}

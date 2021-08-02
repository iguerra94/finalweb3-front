import React from 'react'
import { ActionType } from 'src/context/ui/reducer/ui-actions'

const InitialWeighing = React.lazy(
  () => import('src/components/modal-body/initial-weighing/InitialWeighing')
)
const LoadPumpPasswordInput = React.lazy(
  () =>
    import(
      'src/components/modal-body/load-pump-password-input/LoadPumpPasswordInput'
    )
)
const LoadInfo = React.lazy(
  () => import('src/components/modal-body/load-info/LoadInfo')
)
const UpdateOrderEmailSend = React.lazy(
  () =>
    import(
      'src/components/modal-body/update-order-email-send/UpdateOrderEmailSend'
    )
)
const CloseOrderQuestionWarning = React.lazy(
  () =>
    import(
      'src/components/modal-body/close-order-question-warning/CloseOrderQuestionWarning'
    )
)
const FinalWeighing = React.lazy(
  () => import('src/components/modal-body/final-weighing/FinalWeighing')
)
const OrderConciliation = React.lazy(
  () => import('src/components/modal-body/order-conciliation/OrderConciliation')
)

export const digestMessage = async (message) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return await hash
}

export const orderStateColorMap = {
  1: '#0288D1',
  2: '#FFA000',
  3: '#388E3C',
  4: '#FF5722'
}

export const orderStateActionLabelMap = {
  1: 'Realizar pesaje inicial',
  2: 'Cargar surtidor',
  3: 'Realizar pesaje final',
  4: 'Ver conciliación'
}

const displayInitialWeighingModal = (
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: InitialWeighing,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { numeroOrden }
    }
  })
}

const displayLoadPumpModal = (
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: LoadPumpPasswordInput,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { numeroOrden }
    }
  })
}

export const displayLoadInfoModal = (
  idOrden: number,
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: LoadInfo,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { idOrden, numeroOrden }
    }
  })
}

export const displayUpdateOrderEmailSendModal = (
  idOrden: number,
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: UpdateOrderEmailSend,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { idOrden }
    }
  })
}

export const displayCloseOrderQuestionWarningModal = (
  idOrden: number,
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: CloseOrderQuestionWarning,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { idOrden, numeroOrden }
    }
  })
}

const displayFinalWeighingModal = (
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: FinalWeighing,
      modalTitle: `Orden #${numeroOrden}`,
      modalDynamicData: { numeroOrden }
    }
  })
}

const displayConciliationModal = (
  numeroOrden: string,
  dispatch: React.Dispatch<any>
) => {
  dispatch({
    type: ActionType.OpenModal,
    payload: {
      modalBody: OrderConciliation,
      modalTitle: `Conciliación - Orden #${numeroOrden}`,
      modalDynamicData: { numeroOrden }
    }
  })
}

export const orderStateActionClickHandlerMap = {
  1: displayInitialWeighingModal,
  2: displayLoadPumpModal,
  3: displayFinalWeighingModal,
  4: displayConciliationModal
}

export const formatDate = (date: any) => {
  const datePart = date.split('T')[0]

  const day = datePart.split('-')[2]
  const month = datePart.split('-')[1]
  const year = datePart.split('-')[0]

  return `${day}-${month}-${year}`
}

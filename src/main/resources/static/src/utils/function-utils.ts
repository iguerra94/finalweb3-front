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

const displayInitialWeighingModal = () => {}

const displayLoadPumpModal = () => {}

export const displayLoadInfoModal = () => {}

const displayFinalWeighingModal = () => {}

const displayConciliationModal = () => {}

export const orderStateActionClickHandlerMap = {
  1: displayInitialWeighingModal,
  2: displayLoadPumpModal,
  3: displayFinalWeighingModal,
  4: displayConciliationModal
}

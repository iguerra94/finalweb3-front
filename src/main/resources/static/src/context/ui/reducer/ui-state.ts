import { Color } from '@material-ui/lab/Alert'

export interface UIState {
  loadingData: boolean
  modalData: ModalData
  snackbarData: SnackbarData
}

interface ModalData {
  modalOpen: boolean
  modalTitle: string
  modalBody: React.LazyExoticComponent<() => JSX.Element> | null
  modalDynamicData?: any
}

interface SnackbarData {
  snackbarOpen: boolean
  severity?: Color
  message: string
}

export const initialUIState: UIState = {
  loadingData: false,
  modalData: {
    modalOpen: false,
    modalTitle: '',
    modalDynamicData: {},
    modalBody: null
  },
  snackbarData: {
    snackbarOpen: false,
    severity: undefined,
    message: ''
  }
}

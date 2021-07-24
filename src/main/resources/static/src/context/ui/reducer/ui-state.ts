import { Color } from '@material-ui/lab/Alert'

export interface UIState {
  modalData: ModalData
  snackbarData: SnackbarData
}

interface ModalData {
  modalOpen: boolean
  modalTitle: string
  modalBody: React.LazyExoticComponent<() => JSX.Element> | null
}

interface SnackbarData {
  snackbarOpen: boolean
  severity?: Color
  message: string
}

export const initialUIState: UIState = {
  modalData: {
    modalOpen: false,
    modalTitle: '',
    modalBody: null
  },
  snackbarData: {
    snackbarOpen: false,
    severity: undefined,
    message: ''
  }
}

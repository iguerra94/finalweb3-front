import { ActionType, UIActions } from './ui-actions'
import { initialUIState, UIState } from './ui-state'

export const uiReducer = (state: UIState, action: UIActions) => {
  switch (action.type) {
    case ActionType.OpenModal: {
      const { payload } = action
      return {
        ...state,
        modalData: {
          modalOpen: true,
          modalTitle: payload.modalTitle,
          modalBody: payload.modalBody
        }
      }
    }
    case ActionType.OpenSnackbar: {
      const { payload } = action
      return {
        ...state,
        snackbarData: {
          snackbarOpen: true,
          severity: payload.severity,
          message: payload.message
        }
      }
    }
    case ActionType.CloseModal: {
      return {
        ...state,
        modalData: { ...initialUIState.modalData }
      }
    }
    case ActionType.CloseSnackbar: {
      return {
        ...state,
        snackbarData: { ...initialUIState.snackbarData }
      }
    }
    default:
      throw new Error(`Invalid action type: ${action}`)
  }
}

import { Color } from '@material-ui/lab'

export enum ActionType {
  SetLoading,
  OpenModal,
  OpenSnackbar,
  CloseModal,
  CloseSnackbar
}

export interface SetLoading {
  type: ActionType.SetLoading
  payload: {
    loadingData: boolean
  }
}

export interface OpenModal {
  type: ActionType.OpenModal
  payload: {
    modalBody: React.LazyExoticComponent<() => JSX.Element>
    modalTitle: string
    modalDynamicData?: any
  }
}

export interface OpenSnackbar {
  type: ActionType.OpenSnackbar
  payload: {
    severity: Color
    message: string
  }
}

export interface CloseModal {
  type: ActionType.CloseModal
}

export interface CloseSnackbar {
  type: ActionType.CloseSnackbar
}

export type UIActions =
  | SetLoading
  | OpenModal
  | OpenSnackbar
  | CloseModal
  | CloseSnackbar

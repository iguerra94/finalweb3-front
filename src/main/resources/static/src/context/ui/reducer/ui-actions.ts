import { Color } from '@material-ui/lab'

export enum ActionType {
  OpenModal,
  OpenSnackbar,
  CloseModal,
  CloseSnackbar
}

export interface OpenModal {
  type: ActionType.OpenModal
  payload: {
    modalBody: React.LazyExoticComponent<() => JSX.Element>
    modalTitle: string
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

export type UIActions = OpenModal | OpenSnackbar | CloseModal | CloseSnackbar

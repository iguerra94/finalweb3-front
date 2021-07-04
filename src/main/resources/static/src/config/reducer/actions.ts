import User from 'src/model/User'

export enum ActionType {
  ValidateCredentials,
  Authenticate,
  ShowLoginError,
  HideLoginError,
  Logout
}

export interface ValidateCredentials {
  type: ActionType.ValidateCredentials
}

export interface Authenticate {
  type: ActionType.Authenticate
  payload: User
}

export interface ShowLoginError {
  type: ActionType.ShowLoginError
  payload: string
}

export interface HideLoginError {
  type: ActionType.HideLoginError
}

export interface Logout {
  type: ActionType.Logout
}

export type AuthActions =
  | ValidateCredentials
  | Authenticate
  | ShowLoginError
  | HideLoginError
  | Logout

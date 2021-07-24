import Camion from 'src/model/Camion'
import Cliente from 'src/model/Cliente'
import Producto from 'src/model/Producto'
import { BasicData, NewOrderUIData } from './new-order-state'

export enum ActionType {
  UpdateBasicData,
  UpdateTruckData,
  UpdateClientData,
  UpdateProductData,
  UpdateBtnNextStepEnabledState,
  UpdateBtnCreateOrderClickHandler,
  UpdateCreatingNewOrderState,
  ClearNewOrderData
}

export interface UpdateBasicData {
  type: ActionType.UpdateBasicData
  payload: BasicData
}

export interface UpdateTruckData {
  type: ActionType.UpdateTruckData
  payload: Camion
}

export interface UpdateClientData {
  type: ActionType.UpdateClientData
  payload: Cliente
}

export interface UpdateProductData {
  type: ActionType.UpdateProductData
  payload: Producto
}

export interface UpdateBtnNextStepEnabledState {
  type: ActionType.UpdateBtnNextStepEnabledState
  payload: NewOrderUIData
}

export interface UpdateBtnCreateOrderClickHandler {
  type: ActionType.UpdateBtnCreateOrderClickHandler
  payload: NewOrderUIData
}

export interface UpdateCreatingNewOrderState {
  type: ActionType.UpdateCreatingNewOrderState
  payload: NewOrderUIData
}

export interface ClearNewOrderData {
  type: ActionType.ClearNewOrderData
}

export type NewOrderActions =
  | UpdateBasicData
  | UpdateTruckData
  | UpdateClientData
  | UpdateProductData
  | UpdateBtnNextStepEnabledState
  | UpdateBtnCreateOrderClickHandler
  | UpdateCreatingNewOrderState
  | ClearNewOrderData

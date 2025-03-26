import { Action } from "redux";

export interface AppAction extends Action {
  type: string;
  payload?: any;
  response?: any;
}
export interface AppActionWithIntl extends Action {
  type: string;
  payload?: any;
}
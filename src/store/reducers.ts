import { combineReducers } from "redux";
import { AppAction } from "../model/action.ts";
import { AppState } from "../state/app-state.ts";
import SearchReducer from "../sections/scopeFilters/redux/reducer.ts";


export const reducers = {
    searchState: SearchReducer,
};

const appReducer = combineReducers(reducers);

export const rootReducers: any = (state: AppState, action: AppAction) => {
  return appReducer(state, action);
};

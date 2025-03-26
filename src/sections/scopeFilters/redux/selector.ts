import { createSelector } from "reselect";
import { AppState } from "../../../state/app-state.ts";

const getState = (state: AppState) => state.searchState;

export const getSearchResult = createSelector(
  getState,
  state => state.searchResponseData
);

export const getSearchText = createSelector(
  getState,
  state => state.searchText
);

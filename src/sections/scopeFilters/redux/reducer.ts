import { SearchState, defaultSearchState } from "./state.ts";
import { actionTypes } from "./actions.ts";
import { AppAction } from "../../../model/action.ts";
import { ScopeFilterAttributeEnum, SearchResponseData } from "./model";
import { setTokenState } from "../continuation-token-helper.ts";
import { makeFirstLetterLowercase } from "../text-helper.ts";

const handlers: {
  [key: string]: (state: SearchState, payload: any) => SearchState;
} = {
  [actionTypes.FETCH_SEARCH_RESULT]: (state: SearchState,payload:any): SearchState => {
    return {
      ...state,
      isLoading: payload.continuationToken ? false:true,
    };
  },
  [actionTypes.FETCH_SEARCH_RESULT_SUCCESS]: (
    state: SearchState,
    payload: SearchResponseData
  ): SearchState => {
    return {
      ...state,
      isLoading: false,
      searchResponseData: { ...payload },
    };
  },
  [actionTypes.FETCH_SEARCH_RESULT_FAILED]: (
    state: SearchState,
  ): SearchState => {
    return {
      ...state,
      isLoading: false,
      searchResponseData: {
        results: [], continuationToken: "",
        inputParameters: "",
        showHierarchyMessage: false
      },
    };
  },
  [actionTypes.FETCH_SEARCH_RESULT_APPEND]: (
    state: SearchState,
    payload: SearchResponseData
  ): SearchState => {
    return {
      ...state,
      isLoading: false,
      searchResponseData: {
        ...payload,
        results: [...state.searchResponseData.results, ...payload.results],
      },
    };
  },
  [actionTypes.SET_SEARCH_TEXT]: (
    state: SearchState,
    payload: string
  ): SearchState => {
    return {
      ...state,
      searchText: payload,
    };
  },
  [actionTypes.FETCH_SCOPE_FILTER_DATA]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      [makeFirstLetterLowercase(payload.filterAttribute)]: {
        ...state[makeFirstLetterLowercase(payload.filterAttribute)],
        dropDownOption:!payload.continuationToken ? [] : state[makeFirstLetterLowercase(payload.filterAttribute)].dropDownOption,
        isLoading: true
      },
    };
  },

  [actionTypes.FETCH_SCOPE_FILTER_DATA_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    const options = [] as any;
    if (
      payload.response.filterOptions &&
      payload.response.filterOptions.length > 0
    ) {
      for (let i = 0; i < payload.response.filterOptions.length; i++) {
        options.push({
          label: payload.response.filterOptions[i],
          value: payload.response.filterOptions[i],
        });
      }
    }
    const filterAttribute: string = makeFirstLetterLowercase(
      payload.filterAttribute
    );
    return {
      ...state,
      [filterAttribute]: {
        isLoading: false,
        dropDownOption: options,
        ...setTokenState(payload.response),
      },
    };
  },

  [actionTypes.FETCH_SCOPE_FILTER_DATA_APPEND]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    const options = [] as any;
    for (let i = 0; i < payload.response.filterOptions.length; i++) {
      options.push({
        label: payload.response.filterOptions[i],
        value: payload.response.filterOptions[i],
      });
    }
    const filterAttribute: string = makeFirstLetterLowercase(
      payload.filterAttribute
    );
    return {
      ...state,
      [filterAttribute]: {
        isLoading: false,
        dropDownOption: [...state[filterAttribute].dropDownOption, ...options],
        ...setTokenState(payload.response),
      },
    };
  },
  [actionTypes.HIDE_HIERARCHY_MESSAGE]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      hideHierarchyMessage: payload
    };
  },
  
  [actionTypes.GET_AUDIT_DATA_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      auditSummary: payload.auditSummary,
      incidentSummary: payload.incidentSummary,
    };
  },

  [actionTypes.GET_AUDIT_ACTION_ITEMS_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      auditActionItems: payload?.auditActionsSummary,
     
    };
  },

  [actionTypes.GET_AUDIT_INSIGHT_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      auditInsight: payload.isIFMHub ? payload.response.incidentSummary : payload.response.auditSummary,
     
    };
  },

  [actionTypes.GET_RECOMMENDATION_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      recommendations: payload.recommendations,
    };
  },
  [actionTypes.GET_EPERMIT_DATA_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      ePermitsData: payload.Value.Items,
    };
  },
  [actionTypes.GET_ELOGBOOK_DATA_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      elogBooksData: payload,
    };
  },
  [actionTypes.GET_WEQUOTE_DATA_SUCCESS]: (state: SearchState, payload: any): SearchState => {
    return {
      ...state,
      webQuotesData: payload,
    };
  }
};

const SearchReducer = (
  state: SearchState = { ...defaultSearchState },
  action: AppAction
) => {
  return handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action.payload)
    : state;
};

export default SearchReducer;

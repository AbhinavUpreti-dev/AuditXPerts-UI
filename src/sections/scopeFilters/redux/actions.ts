import { AppAction, AppActionWithIntl } from "../../../model/action";
import { ScopeFilter, ScopeFilterAttribute, SearchResponseData } from "./model";

const prefix = "SEARCH_";

export const actionTypes = {
  FETCH_SEARCH_RESULT: `${prefix}FETCH_SEARCH_RESULT`,
  FETCH_SEARCH_RESULT_SUCCESS: `${prefix}FETCH_SEARCH_RESULT_SUCCESS`,
  FETCH_SEARCH_RESULT_APPEND: `${prefix}FETCH_SEARCH_RESULT_APPEND`,
  SUBMIT_COVID_CHECKIN_STATUS: `${prefix}SUBMIT_COVID_CHECKIN_STATUS`,
  BULK_COVID_CHECK_IN_UPLOAD: `${prefix}BULK_COVID_CHECK_IN_UPLOAD`,
  SET_SEARCH_TEXT: `${prefix}SET_SEARCH_TEXT`,
  FETCH_SCOPE_FILTER_DATA:`${prefix}FETCH_SCOPE_FILTER_DATA`,
  FETCH_SCOPE_FILTER_DATA_SUCCESS:`${prefix}FETCH_SCOPE_FILTER_DATA_SUCCESS`,
  FETCH_SCOPE_FILTER_DATA_APPEND:`${prefix}FETCH_SCOPE_FILTER_DATA_APPEND`,
  FETCH_SEARCH_RESULT_FAILED: `${prefix}FETCH_SEARCH_RESULT_FAILED`,
  GET_AUDIT_DATA: `${prefix}GET_AUDIT_DATA`,
  GET_AUDIT_DATA_SUCCESS: `${prefix}GET_AUDIT_DATA_SUCCESS`,

  HIDE_HIERARCHY_MESSAGE: `${prefix}HIDE_HIERARCHY_MESSAGE`,

  GET_RECOMMENDATION: `${prefix}GET_RECOMMENDATION`,
  GET_RECOMMENDATION_SUCCESS: `${prefix}GET_RECOMMENDATION_SUCCESS`,
  GET_AUDIT_ACTION_ITEMS: `${prefix}GET_AUDIT_ACTION_ITEMS`,
  GET_AUDIT_ACTION_ITEMS_SUCCESS: `${prefix}GET_AUDIT_ACTION_ITEMS_SUCCESS`,
  GET_AUDIT_INSIGHT: `${prefix}GET_AUDIT_INSIGHT`,
  GET_AUDIT_INSIGHT_SUCCESS: `${prefix}GET_AUDIT_INSIGHT_SUCCESS`,
  GET_EPERMIT_DATA: `${prefix}GET_EPERMIT_DATA`,
  GET_EPERMIT_DATA_SUCCESS: `${prefix}GET_EPERMIT_DATA_SUCCESS`,
  GET_WEQUOTE_DATA: `${prefix}GET_WEQUOTE_DATA`,
  GET_WEQUOTE_DATA_SUCCESS: `${prefix}GET_WEQUOTE_DATA_SUCCESS`,
  GET_ELOGBOOK_DATA: `${prefix}GET_ELOGBOOK_DATA`,
  GET_ELOGBOOK_DATA_SUCCESS: `${prefix}GET_ELOGBOOK_DATA_SUCCESS`

};

export const fetchSearchResult = (searchTerm: string, entityType: string, filters: any,showAssignedOnly: boolean, continuationToken?: string): AppAction => ({
  type: actionTypes.FETCH_SEARCH_RESULT,
  payload: {
    searchTerm,
    entityType,
    showAssignedOnly,
    filters,
   // commandId: generateId(),
    continuationToken
  }
});

export const fetchSearchResultSuccess = (searchResult: SearchResponseData): AppAction => ({
  type: actionTypes.FETCH_SEARCH_RESULT_SUCCESS,
  payload: searchResult
});

export const fetchSearchResultAppend = (searchResult: SearchResponseData): AppAction => ({
  type: actionTypes.FETCH_SEARCH_RESULT_APPEND,
  payload: searchResult
});

export const fetchSearchResultFailed = (): AppAction => ({
  type: actionTypes.FETCH_SEARCH_RESULT_FAILED,
 
});

export const submitCovidCheckinStatus = (checkInStatus: boolean, incidentId: string, observationId: string): AppActionWithIntl => ({
  type: actionTypes.SUBMIT_COVID_CHECKIN_STATUS,
  payload: {
    checkInStatus,
    incidentId,
    observationId,
   // commandId: generateId()
  },
  //injectedIntl: intl
});

export const bulkUploadCovidCheckIn = (formData: FormData): AppAction => {
  return {
    type: actionTypes.BULK_COVID_CHECK_IN_UPLOAD,
    payload: formData
  }
};

export const setSearchText = (searchText: string): AppAction => {
  return {
    type: actionTypes.SET_SEARCH_TEXT,
    payload: searchText
  }
};

export const fetchScopeFilterData = (filterAttribute: string, filtersApplied: ScopeFilter, searchTerm: string, continuationToken: string): AppAction => ({
  type: actionTypes.FETCH_SCOPE_FILTER_DATA,
  payload: { filterAttribute: filterAttribute, filtersApplied: filtersApplied, searchTerm: searchTerm, continuationToken: continuationToken },
});

export const fetchScopeFilterDataSuccess = (
  response: any,
  filterAttribute: string
): AppAction => ({
  type: actionTypes.FETCH_SCOPE_FILTER_DATA_SUCCESS,
  payload: {response: response, filterAttribute: filterAttribute},
});

export const fetchScopeFilterDataAppend = (
  response: any,
  filterAttribute: string
): AppAction => ({
  type: actionTypes.FETCH_SCOPE_FILTER_DATA_APPEND,
  payload: {response: response, filterAttribute: filterAttribute},
});

export const hierarchyMessage = (input: boolean): AppAction => {
  return {
    type: actionTypes.HIDE_HIERARCHY_MESSAGE,
    payload: input
  }
};


export const getAuditData = (filters: any): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_DATA,
    payload: filters
  }
}

export const getAuditDataSuccess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_DATA_SUCCESS,
    payload: response
  }
}

export const getRecommendation = (request: any): AppAction => {
  return {
    type: actionTypes.GET_RECOMMENDATION,
    payload: request
  }
}


export const getRecommendationSuccess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_RECOMMENDATION_SUCCESS,
    payload: response
  }
}

export const getAuditActionItems = (filters: any,title:string): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_ACTION_ITEMS,
    payload: {filters,title}
  }
}

export const getAuditActionItemsSuccess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_ACTION_ITEMS_SUCCESS,
    payload: response
  }
}


export const getAuditInsightItems = (filters: any, isIFMHub: boolean): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_INSIGHT,
    payload: { filters, isIFMHub }
  }
}

export const getAuditInsightSuccess = (response: any, isIFMHub: boolean): AppAction => {
  return {
    type: actionTypes.GET_AUDIT_INSIGHT_SUCCESS,
    payload: { response, isIFMHub}
  }
}

export const getePermitsData = (filters: any): AppAction => {
  return {
    type: actionTypes.GET_EPERMIT_DATA,
    payload: filters
  }
}

export const getePermitsDataSuccess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_EPERMIT_DATA_SUCCESS,
    payload: response
  }
}

export const getwebQuotesData = (filters: any): AppAction => {
  return {
    type: actionTypes.GET_WEQUOTE_DATA,
    payload: filters
  }
}

export const getWeQuoteDataSuccess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_WEQUOTE_DATA_SUCCESS,
    payload: response
  }
}


export const getelogBooksData = (filters: any): AppAction => {
  return {
    type: actionTypes.GET_ELOGBOOK_DATA,
    payload: filters
  }
}

export const getelogBooksDataSuceess = (response: any): AppAction => {
  return {
    type: actionTypes.GET_ELOGBOOK_DATA_SUCCESS,
    payload: response
  }
}

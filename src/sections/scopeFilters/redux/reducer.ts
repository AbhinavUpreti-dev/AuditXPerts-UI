import { SearchState, defaultSearchState } from "./state.ts";
import { actionTypes } from "./actions.ts";
import { AppAction } from "../../../model/action.ts";
import { ScopeFilterAttributeEnum, SearchResponseData } from "./model";
import { setTokenState } from "../continuation-token-helper.ts";
import { makeFirstLetterLowercase } from "../text-helper.ts";

const handlers: {
  [key: string]: (state: SearchState, payload: any) => SearchState;
} = {
  [actionTypes.FETCH_SEARCH_RESULT]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: payload.continuationToken ? false : true,
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
    state: SearchState
  ): SearchState => {
    return {
      ...state,
      isLoading: false,
      searchResponseData: {
        results: [],
        continuationToken: "",
        inputParameters: "",
        showHierarchyMessage: false,
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
        dropDownOption: !payload.continuationToken
          ? []
          : state[makeFirstLetterLowercase(payload.filterAttribute)]
              .dropDownOption,
        isLoading: true,
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
  [actionTypes.HIDE_HIERARCHY_MESSAGE]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      hideHierarchyMessage: payload,
    };
  },

  [actionTypes.GET_AUDIT_DATA]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },

  [actionTypes.GET_AUDIT_DATA_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      auditSummary: payload.auditSummary,
      incidentSummary: payload.incidentSummary,
      isLoading: false,
    };
  },

  [actionTypes.GET_AUDIT_ACTION_ITEMS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },

  [actionTypes.GET_AUDIT_ACTION_ITEMS_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: false,
      auditActionItems: payload?.auditActionsSummary,
    };
  },

  [actionTypes.GET_AUDIT_INSIGHT]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },

  [actionTypes.GET_AUDIT_INSIGHT_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      auditInsight: payload.response.auditSummary,
      incidentInsight: payload.response.incidentSummary,
      isLoading: false,
    };
  },

  [actionTypes.GET_IFMHub_INSIGHT_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      ifmHubInsight: payload.response.ifmHubSummary,
      isLoading: false,
    };
  },
  [actionTypes.GET_RECOMMENDATION]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      recommendations: "",
      isLoading: true,
    };
  },
  [actionTypes.GET_RECOMMENDATION_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      recommendations: payload[0].recommendations,
      isLoading: false,
    };
  },
  [actionTypes.GET_EPERMIT_DATA]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [actionTypes.GET_EPERMIT_DATA_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      ePermitsData: [
        {
          Id: "8505b2eb-7826-417d-841a-9f590773b847",
          PtwId: "000003159",
          AtwId: "",
          Status: "InProgress",
          Vendor: "1call propert maintenance",
          Customer: "Onboarding Test",
          Contract: "Onboarding Test",
          Site: "Building One",
          Permit: "Electrical Work Permit",
          PermitType: "Digital",
          PermitDisplayText: "",
          PermitTypeDisplayText: "",
          Permits: "",
          StartDate: "2025-03-26T16:32:02.8986537",
          StartTime: null,
          EndTime: null,
          WorkRequestId: "00000000-0000-0000-0000-000000000000",
          WorkRequestType: "",
          WorkRequestStatus: "",
          ScheduleSiteVisitDate: null,
          OnsiteSiteVisitDate: null,
          ScheduleStatus: "",
          OnSiteStatus: "",
          ClosureStatus: "",
          LastUpdatedDate: "2025-03-26T16:33:00.2693047",
        },
        {
          Id: "f1afd280-6380-4884-982a-465ef0ccf4b4",
          PtwId: "000003157",
          AtwId: "",
          Status: "InProgress",
          Vendor: "1call propert maintenance",
          Customer: "Onboarding Test",
          Contract: "Onboarding Test",
          Site: "Building One",
          Permit: "Electrical Work Permit ",
          PermitType: "Printed",
          PermitDisplayText: "",
          PermitTypeDisplayText: "",
          Permits: "",
          StartDate: "2025-03-26T16:18:07.3280049",
          StartTime: null,
          EndTime: null,
          WorkRequestId: "00000000-0000-0000-0000-000000000000",
          WorkRequestType: "",
          WorkRequestStatus: "",
          ScheduleSiteVisitDate: null,
          OnsiteSiteVisitDate: null,
          ScheduleStatus: "",
          OnSiteStatus: "",
          ClosureStatus: "",
          LastUpdatedDate: "2025-03-26T16:19:18.864039",
        },
        {
          Id: "8505b2eb-7826-417d-841a-9f590773b847",
          PtwId: "000003159",
          AtwId: "",
          Status: "InProgress",
          Vendor: "1call propert maintenance",
          Customer: "Onboarding Test",
          Contract: "Onboarding Test",
          Site: "Building One",
          Permit: "Electrical Work Permit",
          PermitType: "Digital",
          PermitDisplayText: "",
          PermitTypeDisplayText: "",
          Permits: "",
          StartDate: "2025-03-26T16:32:02.8986537",
          StartTime: null,
          EndTime: null,
          WorkRequestId: "00000000-0000-0000-0000-000000000000",
          WorkRequestType: "",
          WorkRequestStatus: "",
          ScheduleSiteVisitDate: null,
          OnsiteSiteVisitDate: null,
          ScheduleStatus: "",
          OnSiteStatus: "",
          ClosureStatus: "",
          LastUpdatedDate: "2025-03-26T16:33:00.2693047",
        },
      ],
      isLoading: false,
    };
  },
  [actionTypes.GET_ELOGBOOK_DATA]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },

  [actionTypes.GET_ELOGBOOK_DATA_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      elogBooksData: payload[0].recommendations,
      isLoading: false,
    };
  },
  [actionTypes.GET_WEQUOTE_DATA]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [actionTypes.GET_WEQUOTE_DATA_SUCCESS]: (
    state: SearchState,
    payload: any
  ): SearchState => {
    return {
      ...state,
      webQuotesData: payload,
      isLoading: false,
    };
  },
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

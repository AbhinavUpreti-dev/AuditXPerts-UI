import { defaultLoadingState, BaseLoadingState } from "../../../state/base-state.ts";
import { SearchResponseData } from "./model";

export interface SearchState extends BaseLoadingState {
  searchResponseData: SearchResponseData;
  auditSummary?: any;
  incidentSummary?: any;
  recommendations?: any;
  auditActionItems?: any;
  searchText?: string;
  auditInsight?: any;
  elogBooksData?: any;
  ePermitsData?: any;
  webQuotesData?: any;
  auditeInsiteIFMHub?: any;
  [key: string]: any;
  businessSegment?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  subBusinessSegment?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  region?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  country?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  division?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  managingOffice?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  client?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  location?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  clientCode?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  locationCode?: {
    isLoading: boolean;
    dropDownOption: any;
    continuationToken?: string;
  };
  hideHierarchyMessage: boolean;
}

export const defaultSearchState: SearchState = {
  ...defaultLoadingState,
  searchResponseData: {
    continuationToken: "",
    inputParameters: "",
    results: [],
    showHierarchyMessage:false
  },
  businessSegment: {
    isLoading: false,
    dropDownOption:[]
  },
  subBusinessSegment:  {
    isLoading: false,
    dropDownOption:[]
  },
  region:  {
    isLoading: false,
    dropDownOption:[]
  },
  country:  {
    isLoading: false,
    dropDownOption:[]
  },
  division:  {
    isLoading: false,
    dropDownOption:[]
  },
  managingOffice:  {
    isLoading: false,
    dropDownOption:[]
  },
  client: {
    isLoading: false,
    dropDownOption:[]
  },
  location:  {
    isLoading: false,
    dropDownOption:[]
  },
  clientCode:  {
    isLoading: false,
    dropDownOption:[]
  },
  locationCode:  {
    isLoading: false,
    dropDownOption:[]
  },
  hideHierarchyMessage: false
};

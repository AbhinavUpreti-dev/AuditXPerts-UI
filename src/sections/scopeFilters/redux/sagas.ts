import { post } from "../api-clients.ts";
import { takeLatest, call, put, select, takeEvery } from "redux-saga/effects";
import { get as getApi } from "../api-clients.ts";
import {
  fetchSearchResultSuccess, actionTypes, fetchSearchResultAppend,
  fetchScopeFilterDataAppend,
  fetchScopeFilterDataSuccess,
  fetchSearchResultFailed,
  getAuditData,
  getAuditDataSuccess,
  getRecommendationSuccess,
  getAuditActionItemsSuccess,
  getAuditInsightSuccess,
  getePermitsDataSuccess,
  getelogBooksDataSuceess,
  getWeQuoteDataSuccess,
  getIFMHubInsightSuccess
} from "./actions.ts";
//import { toast, generateId } from "middleware/toasts";
//import { Response } from "models/response";
import { AppAction, AppActionWithIntl } from "../../../model/action"
import { AppState } from "../../../state/app-state";
//import { post as postFile } from "../azure-clients";
//import { getFormatedSearchText } from "helpers/text-helper";
//import appConfig from "helpers/config-helper";
//import { covertObjectToQueryString } from "helpers/object-helper";

//const config = appConfig();

//const getUserLanguage = (state: AppState) => state.profile.user.language;



export const covertObjectToQueryString = (object: any) => {
  const arrayFilter = Object.keys(object).map(key => {
    if(object[key])
    {
      return `${key}=${encodeURIComponent(object[key])}`;
    }
    else
    {
      return '';
    }
  }).filter(val => val !== '')
  return arrayFilter.join('&');
}


export const getScopeFilterDataApi = (filter:string) => 
  {
    // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
    // if(searchTerm)
    // {
    //   url = `${url}&searchTerm=${searchTerm}`;
    // }
    // const queryFilter = covertObjectToQueryString(filtersApplied);
    // if(queryFilter)
    // {
    //   url = `${url}&${queryFilter}`;
    // }
    return getApi(`https://localhost:7181/api/harbour/getAuditSummary/${filter}`);
  }
  
  export function* fetchScopeFilterData(action: AppAction) {
    try {
      const response: any = yield call(
        getScopeFilterDataApi, 
        action.payload
      );
      yield put(getAuditDataSuccess(response));
      if (response.success) {
        yield put(getAuditDataSuccess(response?.data || {}));
      }
    } catch (error) {
      throw error;
    }
  }


  export const getAuditActionItemsApi = (filter:string,title?:string) => 
    {
      // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
      // if(searchTerm)
      // {
      //   url = `${url}&searchTerm=${searchTerm}`;
      // }
      // const queryFilter = covertObjectToQueryString(filtersApplied);
      // if(queryFilter)
      // {
      //   url = `${url}&${queryFilter}`;
      // }
      return getApi(`https://localhost:7181/api/harbour/getAuditActionSummary/?${filter}&title=${title}`);
    }
    
    export function* getAuditActionItems(action: AppAction) {
      try {
        const response: any = yield call(
          getAuditActionItemsApi, 
          action.payload.filters,
          action.payload.title
        );
        yield put(getAuditActionItemsSuccess(response));
        // if (response.success) {
        //   yield put(getAuditActionItemsSuccess(response?.data || {}));
        // }
      } catch (error) {
        throw error;
      }
    }
  


    export const getAuditInsightApi = (payload: any) => 
      {
        // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
        // if(searchTerm)
        // {
        //   url = `${url}&searchTerm=${searchTerm}`;
        // }
        // const queryFilter = covertObjectToQueryString(filtersApplied);
        // if(queryFilter)
        // {
        //   url = `${url}&${queryFilter}`;
        // }
        return getApi(`https://localhost:7181/api/harbour/getAuditSummary/?${payload.filters}&title=''&isIFMHub=${payload.isIFMHub}`);
      }
      
      export function* getAuditInsightItems(action: AppAction) {
        try {
          const response: any = yield call(
            getAuditInsightApi, 
            action.payload
          );
          if(!action.payload.isIFMHub)
          {
            yield put(getAuditInsightSuccess(response, action.payload.isIFMHub));
          }   
          else{
            yield put(getIFMHubInsightSuccess(response, action.payload.isIFMHub));
          }       
        } catch (error) {
          throw error;
        }
      }
    
    

  export const getRecommendationDataApi = (request:any) => 
    {
      // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
      // if(searchTerm)
      // {
      //   url = `${url}&searchTerm=${searchTerm}`;
      // }
      // const queryFilter = covertObjectToQueryString(filtersApplied);
      // if(queryFilter)
      // {
      //   url = `${url}&${queryFilter}`;
      // }
      return post(`https://localhost:7181/api/ElogBook/recommendations`,request);
    }
    
    export function* getRecommendations(action: AppAction) {
      try {
        const response: any = yield call(
          getRecommendationDataApi, 
          action.payload
        );
        // yield put(getRecommendationSuccess(response));
        
          yield put(getRecommendationSuccess(response || {}));
        
      } catch (error) {
        throw error;
      }
    }


    export const getEPermitsDataApi = (request:any) => 
      {
        // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
        // if(searchTerm)
        // {
        //   url = `${url}&searchTerm=${searchTerm}`;
        // }
        // const queryFilter = covertObjectToQueryString(filtersApplied);
        // if(queryFilter)
        // {
        //   url = `${url}&${queryFilter}`;
        // }
        return post(`https://atwapi-qat.cbreapps.com/api/GetPtwDashboard`,request);
      }
      
      export function* getEPermitsData(action: AppAction) {
        try {
          const response: any = yield call(
            getEPermitsDataApi, 
            action.payload
          );
          yield put(getePermitsDataSuccess(response));
          if (response.success) {
            yield put(getePermitsDataSuccess(response?.data || {}));
          }
        } catch (error) {
          throw error;
        }
      }

      

      export const getElogBooksApi = (request:any) => 
        {
          // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
          // if(searchTerm)
          // {
          //   url = `${url}&searchTerm=${searchTerm}`;
          // }
          // const queryFilter = covertObjectToQueryString(filtersApplied);
          // if(queryFilter)
          // {
          //   url = `${url}&${queryFilter}`;
          // }
          return post(`https://localhost:7181/api/ElogBook/recommendations`,request);
        }
        
        export function* geteLogBooksData(action: AppAction) {
          try {
            const response: any = yield call(
              getElogBooksApi, 
              action.payload
            );
          //  yield put(getelogBooksDataSuceess(response));
           
              yield put(getelogBooksDataSuceess(response || {}));
            
          } catch (error) {
            throw error;
          }
        }
  

        export const getWebQuoteApi = (request:any) => 
          {
            // let url = `/hierarchymanagement/hierarchy/filter/${continuationToken?continuationToken:''}?filterAttribute=${filterAttribute}`;
            // if(searchTerm)
            // {
            //   url = `${url}&searchTerm=${searchTerm}`;
            // }
            // const queryFilter = covertObjectToQueryString(filtersApplied);
            // if(queryFilter)
            // {
            //   url = `${url}&${queryFilter}`;
            // }
            return getApi(`https://localhost:7181/api/WebQuote/GetQuoteEstimates?ClientName=${request.clientName}&LocationDescription=${request.locationDescription}&ContractReference=${request.contractReference}`);
          }
          
          export function* getWebQuoteData(action: AppAction) {
            try {
              const response: any = yield call(
                getWebQuoteApi, 
                action.payload
              );
             // yield put(getePermitsDataSuccess(response));
              
                yield put(getWeQuoteDataSuccess(response || {}));
              
            } catch (error) {
              throw error;
            }
          }
  
          
      
        
    


export function* searchWatchSagas() {
  yield takeLatest(actionTypes.FETCH_SCOPE_FILTER_DATA, fetchScopeFilterData);
  yield takeLatest(actionTypes.GET_AUDIT_DATA, fetchScopeFilterData);

  yield takeLatest(actionTypes.GET_RECOMMENDATION, getRecommendations);

  yield takeLatest(actionTypes.GET_AUDIT_ACTION_ITEMS, getAuditActionItems);
  yield takeEvery(actionTypes.GET_AUDIT_INSIGHT, getAuditInsightItems);
  yield takeLatest(actionTypes.GET_EPERMIT_DATA, getEPermitsData);
  yield takeLatest(actionTypes.GET_ELOGBOOK_DATA, geteLogBooksData);
  yield takeLatest(actionTypes.GET_WEQUOTE_DATA, getWebQuoteData);
}

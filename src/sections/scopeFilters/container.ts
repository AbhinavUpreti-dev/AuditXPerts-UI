import { connect } from "react-redux";
import { AppState } from "../../state/app-state.ts";
import { ScopeFilters } from "./scopeFilters.tsx";
import { Dispatch } from "react";
import { AppAction } from "../../model/action.ts";
import {
  fetchScopeFilterData,
  getAuditActionItems,
  getAuditData,
  getAuditInsightItems,
  getelogBooksData,
  getePermitsData,
  getRecommendation,
  getwebQuotesData,
} from "./redux/actions.ts";
import { get } from "http";

const talent = [
  {
    employeeName: "John Smith",
    trainingName: "Safety Compliance 101",
    status: "Completed"
  },
  {
    employeeName: "Emma Wilson",
    trainingName: "Risk Assessment",
    status: "In Progress"
  },
  {
    employeeName: "Michael Brown",
    trainingName: "Audit Procedures",
    status: "Pending"
  },
  {
    employeeName: "Sarah Davis",
    trainingName: "Quality Management",
    status: "Completed"
  },
  {
    employeeName: "James Johnson",
    trainingName: "Environmental Standards",
    status: "In Progress"
  }
];
const mapStateToProps = (state: AppState) => {
  return {
    segment: state.searchState.businessSegment,
    subBusinessSegment: state.searchState.subBusinessSegment,
    region: state.searchState.region,
    country: state.searchState.country,
    division: state.searchState.division,
    managingOffice: state.searchState.managingOffice,
    client: state.searchState.client,
    location: state.searchState.location,
   // auditData: audit,
    recommendations: state.searchState.recommendations,
    auditSummary: state.searchState.auditSummary,
    auditActionItems: state.searchState.auditActionItems,
    auditInsight: state.searchState.auditInsight,
    ifmHubInsight: state.searchState.ifmHubInsight,
    incidentInsight: state.searchState.incidentInsight,
    ePermitsData: state.searchState.ePermitsData,
    elogBooksData: state.searchState.elogBooksData,
    webQuotesData: state.searchState.webQuotesData,
    isLoading: state.searchState.isLoading,
    talentCoachdata :talent
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    fetchFilterOptions(
      filterAttribute: string,
      filters: any,
      searchTerm: string,
      continuationToken: string
    ): void {
      dispatch(
        fetchScopeFilterData(
          filterAttribute,
          filters,
          searchTerm,
          continuationToken
        )
      );
    },
    getAuditData(filters): void {
      dispatch(getAuditData(filters));
    },
    getAuditActionItems(filters,title): void {
      dispatch(getAuditActionItems(filters,title));
    },
    getRecommendationData(filters): void {
      dispatch(getRecommendation(filters));
    },

    getAuditInSight(filters, isIFMHub,timeLine): void {
      dispatch(getAuditInsightItems(filters, isIFMHub,timeLine));
    },
    getePermitsData(filters): void {
      dispatch(getePermitsData(filters));
    },
    getelogBooksData(filters): void {
      dispatch(getelogBooksData(filters));
    },
    getwebQuotesData(filters): void {
      dispatch(getwebQuotesData(filters));
    }
  };
};

export const ScopeFiltersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScopeFilters);


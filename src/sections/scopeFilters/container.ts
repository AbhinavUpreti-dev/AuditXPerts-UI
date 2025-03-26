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

const audit = "**Audit Summary**\n\n**Title:** Local PJM Tier 3 - Getec Park WST 151 - Laborumbau  \n**Type:** Corporate Audit  \n**Programme:** Project Management (PJM)  \n**Category:** QHSE  \n**Audit Period:** March 21, 2025 – March 24, 2025  \n**Client:** PJM Industrial & Tech Serv Switz  \n**Site Name & Address:** Project Getec Park Stein, Schaffhauserstrasse 101, Stein, Schweiz, 4332, CHE  \n\n**Assigned Team:**  \n- **Auditor:** Dorian Fehr (Email: Dorian.Fehr@cbre.com)  \n- **Auditee:** Tobias Thiel (Email: Tobias.Thiel@cbre.com)  \n\n**Audit Status:** Closed  \n\n**Key Findings:**  \n1. **PJM Processes:** The project team is aware of and follows appropriate PJM processes through regular discussions, emails, and meetings.  \n2. **Team Competency:** The CBRE project team possesses the required skills, training, and experience. Regular training is conducted, and safety guidelines are implemented.  \n3. **Contractor Pre-Qualification:** Contractors are appropriately pre-qualified and onboarded to meet CBRE standards. Only one supplier is used.  \n4. **Contractor Competency:** Contractors are skilled, but the contractor’s Risk Assessment and Method Statements (RAMS) are pending.  \n5. **Tier II Checks:** Tier II Operational Guidelines and Reviews are performed correctly.  \n6. **Project Environment:** The project site is generally well-organized and maintained, though areas for improvement were identified during the site visit.  \n7. **Environmental Impact:** Measures are in place to mitigate effects on the environment, neighboring businesses, and the public. No significant impacts were observed.  \n8. **Health and Safety:** Health and safety practices are effectively implemented, with preventive actions like safety walks, observations, and signage in place.  \n9. **Business Conduct Standards:** The project aligns with CBRE’s Standards of Business Conduct and RISE values, which are applied successfully.  \n\n**Audit Questions and Positive Responses:**  \nA total of nine audit questions were evaluated, and all received positive responses based on thorough reviews, checklists, and observations.  \n\n**Action Items:**  \n- **Question:** Do the contractors’ team (individuals) have the relevant competency to undertake the project tasks?  \n  - **Action Description:** Request RAMS from the cleaning supplier.  \n  - **Root Cause:** Lack of awareness about this requirement.  \n  - **Due Date:** April 18, 2025  \n  - **Status:** Not Started  \n  - **Verification Required:** Yes  \n\n**Conclusion:**  \nThe audit confirms compliance with PJM processes, contractor qualifications, environmental safety standards, and CBRE RISE values. However, further action is required to address the missing RAMS from the contractor."
const reco =
  'AI Generated Summary of :\n### Summary of Recommendations (Section F):\n\nThe overall assessment of the electrical installation has been deemed **UNSATISFACTORY** due to identified dangerous (C1) and/or potentially dangerous (C2) conditions. Remedial action is advised as follows:\n\n1. **Urgent Actions:**\n   - Any observations classified as "Danger present" (Code C1) should be addressed immediately.\n   - Observations classified as "Potentially dangerous" (Code C2) should be acted upon as a matter of urgency.\n\n2. **Further Investigation:**\n   - Observations labeled as "Further investigation required" (Code FI) should be explored without delay.\n\n3. **Recommended Improvements:**\n   - Observations classified as "Improvement recommended" (Code C3) should be carefully considered.\n\n4. **Next Inspection and Testing:**\n   - Subject to the necessary remedial actions being completed, the installation should undergo further inspection and testing by **04 May 2029**, adhering to the recommended maximum frequency as per IET Guidance Note 3.\n\nThese recommendations aim to ensure the safety and functionality of the electrical installation.\n\n';
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

    getAuditInSight(filters, isIFMHub): void {
      dispatch(getAuditInsightItems(filters, isIFMHub));
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


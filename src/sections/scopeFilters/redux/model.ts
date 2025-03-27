export interface SearchRequestData {
  searchTerm: string;
  entityType: EntityType;
  filters: Filter[]; // can be empty array
  continuationToken?: string; // guid
  descriptionLimit?: number;
  titleLimit?: number;
}

export interface ScopeFilter {
  businessSegment: string;
  subBusinessSegment: string;
  region: string;
  country: string;
  division: string;
  managingOffice: string;
  client: string;
  location: string;
  clientCode: string;
  locationCode: string;
  includeDeactivatedHierarchies: boolean;
}

export enum ScopeFilterAttribute {
  None,
  BusinessSegment,
  SubBusinessSegment,
  Region,
  Country,
  Division,
  ManagingOffice,
  Client,
  Location,
  ClientCode,
  LocationCode,
  IncludeDeactivatedHierarchies,
}

export enum ScopeFilterAttributeEnum {
  None = "none",
  BusinessSegment = "businessSegment",
  SubBusinessSegment = "subBusinessSegment",
  Region = "region",
  Country = "country",
  Division = "division",
  ManagingOffice = "managingOffice",
  Client = "client",
  Location = "location",
  ClientCode = "clientCode",
  LocationCode = "locationCode",
  Title = "title",
  AuditCategory = "auditCategory",
}

export enum SectionType {
  "Recommendation" = "Recommendation",
  "AuditAction" = "Audit Action Item",
  "AuditSummary" = "Audit Summary",
  "AuditSiteInsights" = "Audit Site Insights",
}

export enum ProjectName {
  "webQuote" = "webQuote",
  "ePermits" = "ePermits",
  "elogBooks" = "eLogBooks",
}


export enum ProjectNameInsight {
  "harBour" = "harbour",
  "IFMhub" = "IFMhub",
  'myVintage' = 'myVintage',
  "talentCouch" = "talentCouch",
}

export enum Months {
  "3Months" = 3,
  "6Months" = 6,
}


export enum EntityType {
  All = "all",
  Observation = "observation",
  Incident = "incident",
  Investigation = "investigation",
  Action = "action",
  Audit = "audit",
  AnswerAudit = "AnswerAudit",
}

export enum FilterEntityType {
  All = "all",
  Observation = "observation",
  Incident = "incident",
  Investigation = "investigation",
  Action = "action",
  AuditTemplate = "auditTemplate",
  AssignedAudit = "assignedAudit",
  HierarchyFilter = "hierarchyFilter",
}

export enum CompletionStatus {
  NotStarted = "NotStarted",
  Started = "Started",
  Completed = "Completed",
}

export enum DueStatus {
  Scheduled = "Scheduled",
  Active = "Active",
  Past = "Past",
}

export interface Filter {
  key: FilterKey;
  value: any;
}

export enum FilterKey {
  FromDateUTC = "fromDateUTC",
  ToDateUTC = "toDateUTC",
  Location = "location",
  IncidentType = "incidentType",
  ObservationType = "observationType",
  Significance = "severity",
  DocumentTags = "documentTags",
  Children = "hasChildren",
  AuditStatus = "auditStatus",
  AuditType = "auditType",
  ShowPastAudits = "showPastAudits",
  ReturnAssigneeTypeAuditor = "returnAssigneeTypeAuditor",
  ReturnAssigneeTypeAuditee = "returnAssigneeTypeAuditee",
  Auditor = "auditor",
  Auditee = "auditee",
  ProgrammeType = "programmeType",
  AuditCategory = "auditCategory",
  Protocol = "protocol",
  Title = "title",
  ActionStatus = "statuses",
  ActionAssignee = "actionAssignees",
  Classification = "classification",
  ProjectRelated = "isProjectRelated",
  FromDueDateUTC = "fromDueDateUTC",
  ToDueDateUTC = "toDueDateUTC",
  Status = "statuses",
  DeletedRecords = "showDeletedRecord",
  AssuranceTemplateType = "assuranceTemplateType",
  IncidentStatus = "statuses",
  HierarchyFilter = "hierarchyFilter",
}

export interface SearchResponseData {
  continuationToken: string;
  inputParameters: string;
  results: Result[];
  totalCount?: number | null;
  showHierarchyMessage: boolean;
}

export interface CovidAssesmentDetails {
  location: string;
  certification: boolean;
  myShiftTime: string;
  isCheckedIn: boolean;
}

export interface Assignee {
  userId: string;
  firstName: string;
  lastName: string;
  type?: AssigneeType;
}

export interface ActionsIncidentsInvestigationsCount {
  closeCount: number;
  openCount: number;
}
export interface Result {
  isValidCovidDoc: boolean;
  date: Date;
  description: string;
  entityId: string;
  entityType: EntityType;
  title: string;
  relatedItemType?: EntityType;
  relatedItemId?: string;
  descriptionBody: string;
  location: string;
  highlightText: string;
  recordId: string;
  createdBy: string;
  createdByEmailId: string;
  isDraft?: boolean;
  siteId: string;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  investigatorId?: string;
  investigatorName?: string;
  assignees: Assignee[];
  dueStatus: DueStatus;
  completionStatus: CompletionStatus;
  status?: string;
  covidAssesmentDetails: CovidAssesmentDetails;
  siteStartDateHash: string;
  incidentType: string;
  isVaccinated: string;
  injuredPersonType: string;
  incidentClassification: string;
  incidentManualClassification: string;
  employeeId: string;
  isTemplate?: boolean;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  contractName: string;
  createdById: string;
  actionsCount: ActionsIncidentsInvestigationsCount;
  incidentsCount: ActionsIncidentsInvestigationsCount;
  incidentActionsCount: ActionsIncidentsInvestigationsCount;
  incidentInvestigationsCount: ActionsIncidentsInvestigationsCount;
  investigationActionsCount: ActionsIncidentsInvestigationsCount;
  isProjectRelated?: string | undefined;
  isDeleted: boolean;
  isCovid19Tested: string;
  covid19TestDate: Date;
  recordRegion: string;
  isPendingReview?: boolean;
  clientName: string;
  isCustomTemplate?: boolean | null;
  severity: Significance;
  observationClassifications: string[];
  whenDate: Date;
}

export enum IncidentType {
  InjuryIllness = "injuryIllness",
  Environmental = "environmental",
  Fleet = "fleet",
  NonInjury = "nonInjury",
  PropertyDamage = "propertyDamage",
  Regulatory = "regulatory",
  QualityEvent = "qualityEvent",
  ContagiousDisease = "contagiousDisease",
  CovidSelfAssessment = "covidSelfAssessment",
}

export enum ObservationType {
  ContagiousDisease = "ContagiousDisease",
  CovidSelfAssessment = "CovidSelfAssessment",
  Other = "Other",
}

export enum Significance {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Sif = "SIF",
}

export enum DocumentTags {
  Policy = "Policy",
  Standard = "Standard",
  EnvironmentalCompliance = "Environmental Compliance",
  EnvironmentalMonitoring = "Environmental Monitoring",
  OccupationalHealth = "Occupational Health",
  Training = "Training",
  RegulatoryDocumentation = "Regulatory Documentation",
  EmergencyPlans = "Emergency Plans",
  UserAdministration = "User Administration",
  LegalHold = "Legal Hold",
  Observation = "Observation",
  Audit = "Audit",
  WorkComp = "Work Comp",
  InsuranceClaims = "Insurance Claims",
}

export enum Children {
  Yes = "Yes",
  No = "No",
}

export enum Status {
  Open = "Open",
  Closed = "Closed",
}

export enum ProjectRelated {
  Yes = "global.Yes",
  No = "global.No",
}

export enum AssigneeType {
  Auditor = 1,
  Auditee = 2,
  ActionResponsible = 3,
  ActionVerifier = 4,
}

export enum AuditStatus {
  Open = "Open",
  InProgress = "InProgress",
  OnHold = "OnHold",
  Cancelled = "Cancelled",
  Close = "Close",
  Completed = "Completed",
}

export enum AuditType {
  Site = "Site",
  Corporate = "Corporate",
  Client = "Client",
  External = "External",
  System = "System",
}

export enum ProtocolType {
  Protocol = "Protocol",
  NonProtocol = "NonProtocol",
  Both = "Both",
}

export enum ActionStatus {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Completed = "Completed",
  Resolved = "Resolved",
  OnHold = "OnHold",
  Closed = "Closed",
  Cancelled = "Cancelled",
}

export enum InvestigationStatus {
  Open = "Open",
  InProgress = "InProgress",
  Completed = "Completed",
  Closed = "Closed",
  Cancelled = "Cancelled",
}

export enum IncidentStatusModel {
  Draft = "Draft",
  Open = "Open",
  Completed = "Completed",
  Close = "Close",
  Cancelled = "Cancelled",
}

export enum InvestigationStatusModel {
  Open = "Open",
  Completed = "Completed",
  InProgress = "InProgress",
  Close = "Closed",
  Cancelled = "Cancelled",
}

export enum Classification {
  Reportable = "Reportable",
  Recordable = "Recordable",
  FirstAid = "FirstAid",
  LostTime = "LostTime",
  Restricted = "Restriction",
}

export enum HomeLocation {
  Yes = "global.Yes",
  No = "global.No",
}

export enum VaccinationStaus {
  True = "True",
  False = "False",
}

export enum DeletedRecords {
  Yes = "Yes",
  No = "No",
}

export enum Covid19Tested {
  Yes = "Yes",
  No = "No",
  Other = "Other",
}

export enum AssuranceTemplateType {
  FileUpload = "FileUpload",
  FormBuilder = "FormBuilder",
}

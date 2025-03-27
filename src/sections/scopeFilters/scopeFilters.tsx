import * as React from "react";
import {
  EntityType,
  Filter,
  FilterKey,
  Months,
  ProjectName,
  ProjectNameInsight,
  ScopeFilterAttribute,
  ScopeFilterAttributeEnum,
  SectionType,
} from "./redux/model.ts";
import "./scopeFilters.scss";
import magicButtom from "./icon/magic button 1.svg";

import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import FloatingLabelSelect from "../floatingLabelSelect/floatingLabelSelect.tsx";
import ReactMarkdown from "react-markdown";

let searchApiTrigger: any = null;

export interface ScopeFiltersProps {
  hierarchyFilters: any;
  setHierarchyFilters: any;
  segment: any;
  subBusinessSegment: any;
  region: any;
  country: any;
  division: any;
  managingOffice: any;
  client: any;
  location: any;
  fetchFilterOptions(
    filterAttribute: string,
    filters: any,
    searchTerm: string,
    continuationToken: string
  ): void;
  getAuditData(filters: string): void;
  auditData: any;
  getRecommendationData(request: any): void;
  recommendations: any;
  isLoading: boolean;

  getAuditActionItems(filters: string, title): void;
  auditActionItems: any;

  getAuditInSight(filters: string, isIFMHub: boolean): void;
  auditInsight: any;
  ifmHubInsight: any;
  incidentInsight: any;

  getePermitsData(filters: any): void;
  ePermitsData: any;

  getwebQuotesData(filters: any): void;
  webQuotesData: any;

  getelogBooksData(filters: any): void;
  elogBooksData: any;
}

export const ScopeFiltersComponent: React.FC<
  React.PropsWithChildren<ScopeFiltersProps>
> = (props) => {
  const { setHierarchyFilters, hierarchyFilters } = props;
  console.log("audit dataaaa", props.auditData);
  const [typing, setTyping] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [focussedFilter, setFocussedFilter] = React.useState<any>("");
  const [projectName, setProjectName] = React.useState<any>([
    ProjectName.webQuote,
    ProjectName.ePermits,
    ProjectName.elogBooks,
  ]);
  const [insightProjectName, setInsightProjectName] = React.useState<any>([
    ProjectNameInsight.harBour,
    ProjectNameInsight.IFMhub,
  ]);

  const defaultOption = {
    value: "global.dropdown.default",
    label: "Select One",
  };
  const loadingState = {
    value: "loader.pleaseWait",
    label: "Please Wait",
  };

  const getInitialValues = (filterAttribute: string) => {
    if (hierarchyFilters?.[filterAttribute]) {
      const value = hierarchyFilters[filterAttribute];
      const label = value === "global.dropdown.default" ? " Select One" : value;
      return { value, label };
    }
    return { ...defaultOption };
  };

  const [businessSegment, setBusinessSegment] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.BusinessSegment)
  );
  const [subSegment, setsubSegment] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.SubBusinessSegment)
  );

  const [region, setRegion] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Region)
  );
  const [country, setCountry] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Country)
  );

  const [division, setDivision] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Division)
  );

  const [managingOffice, setManagingOffice] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.ManagingOffice)
  );

  const [client, setClient] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Client)
  );

  const [location, setLocation] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Location)
  );

  const [customer, setCustomer] = React.useState(getInitialValues("customer"));

  const [project, setProject] = React.useState(getInitialValues("project"));

  const [building, setBuilding] = React.useState(getInitialValues("building"));

  const [documentGroup, setDocumentGroup] = React.useState(
    getInitialValues("documentGroup")
  );

  const [documentSubGroup, setDocumentSubGroup] = React.useState(
    getInitialValues("documentSubGroup")
  );
  const [customDocumentGroup, setCustomDocumentGroup] = React.useState(
    getInitialValues("customDocumentGroup")
  );

  const [title, setTitle] = React.useState(
    getInitialValues(ScopeFilterAttributeEnum.Title)
  );

  const [sectionTypes, setSectionTypes] = React.useState<
    SectionType | undefined
  >(undefined);

  const [selectedMonth, setSelectedMonth] = React.useState<Months | undefined>(
    undefined
  );
  interface FilterMapping {
    key: ScopeFilterAttributeEnum;
    setter: (value: any) => void;
  }
  const checkIfValueChanged = (type: string, newValue: string) => {
    // If no hierarchyFilters or value doesn't exist, it's a change
    if (!hierarchyFilters || !hierarchyFilters[type]) {
      return true;
    }

    // Compare current value with new value
    return hierarchyFilters[type] !== newValue;
  };

  const clearandUpdateChildFilter = (type: string, updatedValue: any) => {
    const filterHierarchy: { [key: string]: FilterMapping[] } = {
      [ScopeFilterAttributeEnum.BusinessSegment]: [
        {
          key: ScopeFilterAttributeEnum.SubBusinessSegment,
          setter: setsubSegment,
        },
        { key: ScopeFilterAttributeEnum.Region, setter: setRegion },
        { key: ScopeFilterAttributeEnum.Country, setter: setCountry },
        { key: ScopeFilterAttributeEnum.Division, setter: setDivision },
        {
          key: ScopeFilterAttributeEnum.ManagingOffice,
          setter: setManagingOffice,
        },
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.SubBusinessSegment]: [
        { key: ScopeFilterAttributeEnum.Region, setter: setRegion },
        { key: ScopeFilterAttributeEnum.Country, setter: setCountry },
        { key: ScopeFilterAttributeEnum.Division, setter: setDivision },
        {
          key: ScopeFilterAttributeEnum.ManagingOffice,
          setter: setManagingOffice,
        },
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.Region]: [
        { key: ScopeFilterAttributeEnum.Country, setter: setCountry },
        { key: ScopeFilterAttributeEnum.Division, setter: setDivision },
        {
          key: ScopeFilterAttributeEnum.ManagingOffice,
          setter: setManagingOffice,
        },
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.Country]: [
        { key: ScopeFilterAttributeEnum.Division, setter: setDivision },
        {
          key: ScopeFilterAttributeEnum.ManagingOffice,
          setter: setManagingOffice,
        },
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.Division]: [
        {
          key: ScopeFilterAttributeEnum.ManagingOffice,
          setter: setManagingOffice,
        },
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.ManagingOffice]: [
        { key: ScopeFilterAttributeEnum.Client, setter: setClient },
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
      [ScopeFilterAttributeEnum.Client]: [
        { key: ScopeFilterAttributeEnum.Location, setter: setLocation },
      ],
    };

    const updatedHierarchyFilters = { ...hierarchyFilters };
    if (checkIfValueChanged(type, updatedValue)) {
      const filtersToReset = filterHierarchy[type] || [];

      // Reset all child filters
      filtersToReset.forEach((filter) => {
        delete updatedHierarchyFilters[filter.key];
        filter.setter(defaultOption);
      });
    }

    console.log("==>", updatedValue);
    console.log("====a.", updatedHierarchyFilters);

    //  setHierarchyFilters({ ...updatedHierarchyFilters, [type]: updatedValue });
  };

  // React.useEffect(() => {
  //   if (_.isEmpty(hierarchyFilters)) {
  //     setBusinessSegment(defaultOption);
  //     setsubSegment(defaultOption);
  //     setRegion(defaultOption);
  //     setCountry(defaultOption);
  //     setDivision(defaultOption);
  //     setManagingOffice(defaultOption);
  //     setClient(defaultOption);
  //     setLocation(defaultOption);
  //   }
  // }, [hierarchyFilters]);

  const getDropDownValue = (filterOption: string) => {
    switch (filterOption) {
      case ScopeFilterAttributeEnum.BusinessSegment:
        return [{ label: "GWS", value: "2" }];
      case ScopeFilterAttributeEnum.SubBusinessSegment:
        return [{ label: "GWS Local", value: "44" }];
      case ScopeFilterAttributeEnum.Region:
        return [{ label: "EMEA", value: "3" }];
      case ScopeFilterAttributeEnum.Country:
        return [{ label: "Switzerland", value: "10" }];
      case ScopeFilterAttributeEnum.Division:
        return [{ label: "Central Europe & Nordics", value: "826" }];
      case ScopeFilterAttributeEnum.ManagingOffice:
        return [{ label: "Industrial & Tech Serv. Switz", value: "22779" }];
      case ScopeFilterAttributeEnum.Client:
        return [{ label: "PJM Industrial & Tech Serv Switz", value: "3334" }];
      case ScopeFilterAttributeEnum.Location:
        return [{ label: "Project Getec Park Stein", value: "628665" }];
      case "customer":
        return [{ label: "Santander", value: "Santander" }];
      case "project":
        return [{ label: "Santander", value: "Santander" }];
      case "building":
        return [
          {
            label: "Aberdeen 171-173 US-ST032313",
            value: "Aberdeen 171-173 US-ST032313",
          },
        ];
      case "documentGroup":
        return [
          {
            label: "C - Electrical Safety Logbook",
            value: "C - Electrical Safety Logbook",
          },
        ];
      case "documentSubGroup":
        return [
          {
            label:
              "010 Electrical Installation Certificates (including Minor Works)",
            value:
              "010 Electrical Installation Certificates (including Minor Works)",
          },
        ];
      case "customDocumentGroup":
        return [
          { label: "Custom Document Group", value: "customDocumentGroup" },
        ];
      case "title":
        return [
          {
            label: "Local PJM Tier 3 - Getec Park WST 151 - Laborumbau",
            value: "Local PJM Tier 3 - Getec Park WST 151 - Laborumbau",
          },
          {
            label: "GWS IRMS Standard Assurance Summarised - AGM",
            value: "GWS IRMS Standard Assurance Summarised - AGM",
          },
          {
            label: "BPL Electrical Logbook Audit",
            value: "BPL Electrical Logbook Audit",
          },
          {
            label: "Hines",
            value: "Hines",
          },
          {
            label: "GWS IRMS Healthcheck - QHSE",
            value: "GWS IRMS Healthcheck - QHSE",
          },
          {
            label: "B&Q - AGM Audit (January 2025)",
            value: "B&Q - AGM Audit (January 2025)",
          },
        ];
      default:
        return [{ label: "Select one", value: "0" }];
    }
  };
  const getFilterOptionsData = (filterOption: any) => {
    const dropDownValue = getDropDownValue(filterOption);
    // if (dropDownValue?.isLoading) {
    //   if (dropDownValue.continuationToken !== "") {
    //     return [
    //       defaultOption,
    //       ...(dropDownValue.dropDownOption || []),
    //       loadingState,
    //     ];
    //   } else {
    //     return [];
    //   }
    // } else {
    //   return [defaultOption, ...(dropDownValue.dropDownOption || [])];
    // }

    return [defaultOption, ...dropDownValue];
  };

  const onSelectionChange = (e: any, type: any) => {
    switch (type) {
      case ScopeFilterAttributeEnum.BusinessSegment:
        setBusinessSegment(e);
        break;
      case ScopeFilterAttributeEnum.SubBusinessSegment:
        setsubSegment(e);
        break;
      case ScopeFilterAttributeEnum.Region:
        setRegion(e);
        break;
      case ScopeFilterAttributeEnum.Country:
        setCountry(e);
        break;
      case ScopeFilterAttributeEnum.Division:
        setDivision(e);
        break;
      case ScopeFilterAttributeEnum.ManagingOffice:
        setManagingOffice(e);
        break;
      case ScopeFilterAttributeEnum.Client:
        setClient(e);
        break;
      case ScopeFilterAttributeEnum.Location:
        setLocation(e);
        break;
      case "customer":
        setCustomer(e);
        break;
      case "project":
        setProject(e);
        break;
      case "building":
        setBuilding(e);
        break;
      case "documentGroup":
        setDocumentGroup(e);
        break;
      case "documentSubGroup":
        setDocumentSubGroup(e);
        break;
      case "customDocumentGroup":
        setCustomDocumentGroup(e);
        break;
      case "title":
        setTitle(e);
    }
    clearandUpdateChildFilter(type, e.value);
  };

  const getInputFilter = (filterAttribute: string) => {
    let inputFilter = {} as any;
    if (
      businessSegment?.value &&
      businessSegment?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.BusinessSegment.toLowerCase()
    ) {
      inputFilter = { businessSegment: businessSegment.value };
    }
    if (
      subSegment?.value &&
      subSegment?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.SubBusinessSegment.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, subBusinessSegment: subSegment.value };
    }
    if (
      region?.value &&
      region?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.Region.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, region: region.value };
    }
    if (
      country?.value &&
      country?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.Country.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, country: country.value };
    }
    if (
      division?.value &&
      division?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.Division.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, division: division.value };
    }
    if (
      managingOffice?.value &&
      managingOffice?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.ManagingOffice.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, managingOffice: managingOffice.value };
    }
    if (
      client?.value &&
      client?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.Client.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, client: client.value };
    }
    if (
      location?.value &&
      location?.value !== "global.dropdown.default" &&
      filterAttribute.toLowerCase() !==
        ScopeFilterAttributeEnum.Location.toLowerCase()
    ) {
      inputFilter = { ...inputFilter, location: location.value };
    }
    return inputFilter;
  };

  const getFilterOptions = (filterAttribute: string) => {
    const dropDownValue = getDropDownValue(
      ScopeFilterAttributeEnum[
        filterAttribute as keyof typeof ScopeFilterAttributeEnum
      ]
    );
    if (focussedFilter !== filterAttribute) {
      setFocussedFilter(filterAttribute);
      const inputFilter = getInputFilter(filterAttribute);
      props.fetchFilterOptions(filterAttribute, inputFilter, "", "");
    }
  };

  // const handleScroll = (filterOption: any) => {
  //   const dropDownValue = getDropDownValue(filterOption);
  //   if (!dropDownValue.isLoading && dropDownValue.continuationToken) {
  //     const inputFilter = getInputFilter(filterOption);
  //     props.fetchFilterOptions(
  //       filterOption,
  //       inputFilter,
  //       searchTerm,
  //       dropDownValue.continuationToken
  //     );
  //   }
  // };

  const onTextInputChange = (value: string, filterOption: any) => {
    const dropDownValue = getDropDownValue(filterOption);
    const inputFilter = getInputFilter(filterOption);
    if (searchTerm !== value) {
      setSearchTerm(value);
      setTyping(true);
      clearTimeout(searchApiTrigger);
      searchApiTrigger = setTimeout(() => {
        props.fetchFilterOptions(filterOption, inputFilter, value, "");
      }, 500);
    }
  };

  const isDisabled = (level: ScopeFilterAttribute) => {
    if (level === ScopeFilterAttribute.BusinessSegment) {
      return false;
    } else if (level === ScopeFilterAttribute.SubBusinessSegment) {
      return !(
        businessSegment?.value &&
        businessSegment?.value !== "global.dropdown.default"
      );
    } else if (level === ScopeFilterAttribute.Region) {
      return !(
        subSegment?.value && subSegment?.value !== "global.dropdown.default"
      );
    } else if (level === ScopeFilterAttribute.Country) {
      return !(region?.value && region?.value !== "global.dropdown.default");
    } else if (level === ScopeFilterAttribute.Division) {
      return !(country?.value && country?.value !== "global.dropdown.default");
    } else if (level === ScopeFilterAttribute.ManagingOffice) {
      return !(
        division?.value && division?.value !== "global.dropdown.default"
      );
    } else if (level === ScopeFilterAttribute.Client) {
      return !(
        managingOffice?.value &&
        managingOffice?.value !== "global.dropdown.default"
      );
    } else if (level === ScopeFilterAttribute.Location) {
      return !(client?.value && client?.value !== "global.dropdown.default");
    }

    return true;
  };

  const getFilters = () => {
    return (
      <Row>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.BusinessSegment)
            // }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.segment.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.BusinessSegment)
            }
            options={getFilterOptionsData(
              ScopeFilterAttributeEnum.BusinessSegment
            )}
            value={businessSegment}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.BusinessSegment)
            }
            filterOption={() => {
              return true;
            }}
            label={"Segment"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.SubBusinessSegment)
            // }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.subBusinessSegment.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            options={getFilterOptionsData(
              ScopeFilterAttributeEnum.SubBusinessSegment
            )}
            value={subSegment}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            filterOption={() => {
              return true;
            }}
            label={"Sub Segment"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.Region)
            // }
            loadingMessage={"Please Wait"}
            isLoading={props.region.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Region)
            }
            options={getFilterOptionsData(ScopeFilterAttributeEnum.Region)}
            value={region}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.Region)
            }
            filterOption={() => {
              return true;
            }}
            label={"Region"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.Country)
            // }
            loadingMessage={"Please Wait"}
            isLoading={props.country.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Country)
            }
            options={getFilterOptionsData(ScopeFilterAttributeEnum.Country)}
            value={country}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.Country)
            }
            label={"Country"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.Division)
            // }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.division.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Division)
            }
            options={getFilterOptionsData(ScopeFilterAttributeEnum.Division)}
            value={division}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.Division)
            }
            filterOption={() => {
              return true;
            }}
            label={"Sector"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.ManagingOffice)
            // }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.managingOffice.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.ManagingOffice)
            }
            options={getFilterOptionsData(
              ScopeFilterAttributeEnum.ManagingOffice
            )}
            value={managingOffice}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.ManagingOffice)
            }
            filterOption={() => {
              return true;
            }}
            label={"Managing Office"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.Client)
            // }
            loadingMessage={(obj: any) => " Please Wait"}
            isLoading={props.client.isLoading}
            //  isDisabled={isDisabled(level)}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Client)
            }
            options={getFilterOptionsData(ScopeFilterAttributeEnum.Client)}
            value={client}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.Client)
            }
            filterOption={() => {
              return true;
            }}
            label={"Client"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            // onMenuScrollToBottom={() =>
            //   handleScroll(ScopeFilterAttributeEnum.Location)
            // }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.location.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Location)
            }
            options={getFilterOptionsData(ScopeFilterAttributeEnum.Location)}
            value={location}
            onChange={(e) =>
              onSelectionChange(e, ScopeFilterAttributeEnum.Location)
            }
            filterOption={() => {
              return true;
            }}
            label={"Location"}
          />
        </Col>
      </Row>
    );
  };

  const getDropdown = () => {
    return [
      {
        label: "Harbour",
        value: "Harbour",
      },
      {
        label: "ElogBooks",
        value: "ElogBooks",
      },
    ];
  };

  enum ScopeHierarchyLevel {
    businessSegment = 12,
    subSegment = 13,
    region = 10,
    country = 11,
    division = 14,
    managingOffice = 16,
    client = 15,
    clientManagingOffice = 18,
    location = 17,
    None = 0,
  }

  const buildQueryString = (filters: any) => {
    let queryString = "";

    Object.entries(filters).forEach(([key, value]: [string, any]) => {
      if (value && value.value !== "global.dropdown.default") {
        const hierarchyLevel =
          ScopeHierarchyLevel[key as keyof typeof ScopeHierarchyLevel];
        queryString += `&filter=${hierarchyLevel}_${value.value}`;
      }
    });

    // Remove the leading & if present
    return queryString.startsWith("&") ? queryString.substring(1) : queryString;
  };

  // Modify your getauditType function
  const getauditType = () => {
    const currentFilters = {
      businessSegment,
      subSegment,
      region,
      country,
      division,
      managingOffice,
      client,
      location,
    };

    const queryString = buildQueryString(currentFilters);
    console.log("===>", queryString);
    props.getAuditData(queryString);
    //   return queryString;
  };
  const getSection = (type) => {
    setSectionTypes(type);
  };

  const getMonths = (type) => {
    setSelectedMonth(type);
  };

  const getElogbooksDropdowns = () => {
    return (
      <Row>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.BusinessSegment)
            }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.segment.isLoading}
            onInputChange={(e: any) => onTextInputChange(e, "customer")}
            options={getFilterOptionsData("customer")}
            value={customer}
            onChange={(e) => onSelectionChange(e, "customer")}
            filterOption={() => {
              return true;
            }}
            label={"Customer"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.subBusinessSegment.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            options={getFilterOptionsData("project")}
            value={project}
            onChange={(e) => onSelectionChange(e, "project")}
            filterOption={() => {
              return true;
            }}
            label={"Project/Contaract"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.Region)
            }
            loadingMessage={"Please Wait"}
            isLoading={props.region.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Region)
            }
            options={getFilterOptionsData("building")}
            value={building}
            onChange={(e) => onSelectionChange(e, "building")}
            filterOption={() => {
              return true;
            }}
            // onFocus={() =>
            //   getFilterOptions(
            //     ScopeFilterAttribute[ScopeFilterAttribute.Region]
            //   )
            // }
            label={"Building"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.Country)
            }
            loadingMessage={"Please Wait"}
            isLoading={props.country.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Country)
            }
            options={getFilterOptionsData("documentGroup")}
            value={documentGroup}
            onChange={(e) => onSelectionChange(e, "documentGroup")}
            // onFocus={() =>
            //   getFilterOptions(
            //     ScopeFilterAttribute[ScopeFilterAttribute.Country]
            //   )
            // }
            label={"Document Group"}
          />
        </Col>
        <Col xs={6} md={3} lg={3}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.Division)
            }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.division.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Division)
            }
            options={getFilterOptionsData("documentSubGroup")}
            value={documentSubGroup}
            onChange={(e) => onSelectionChange(e, "documentSubGroup")}
            filterOption={() => {
              return true;
            }}
            // onFocus={() =>
            //   getFilterOptions(
            //     ScopeFilterAttribute[ScopeFilterAttribute.Division]
            //   )
            // }
            label={"Document Sub Group"}
          />
        </Col>
      </Row>
    );
  };
  const getRecommendation = () => {
    const request = {
      customerName: customer.value,
      contractName: project.value,
      buildingName: building.value,
      documentGroup: documentGroup.value,
      documentSubGroup: documentSubGroup.value,
    };
    props.getRecommendationData(request);
  };

  const getLabel = () => {
    switch (sectionTypes) {
      case SectionType.AuditAction:
        return "Audit Action Items";
      case SectionType.AuditSummary:
        return "Audit Summary";
      case SectionType.AuditSiteInsights:
        return "Audit/Site Insights";
      case SectionType.Recommendation:
        return "Recommendations";
      default:
        return "Audit Action Items";
    }
  };
  const getAuditSummury = () => {
    const req = {
      Pagination: { Skip: 0, Take: 5 },
      Filters: [
        { FieldName: "Customer", Value: "OnBoarding Test" },
        { FieldName: "Contract", Value: "" },
        { FieldName: "Site", Value: "" },
      ],
    };
    const request = {
      customerName: customer.value,
      contractName: project.value,
      buildingName: building.value,
    };
    const requestWebQuote = {
      clientName: "Santander",
      contractReference: "CA000627.012",
      locationDescription: "Aberdeen 171-173 US",
    };

    if (projectName.includes(ProjectName.ePermits)) {
      props.getePermitsData(req);
    }
    if (projectName.includes(ProjectName.elogBooks)) {
      props.getelogBooksData(request);
    }

    if (projectName.includes(ProjectName.webQuote)) {
      props.getwebQuotesData(requestWebQuote);
    }
  };

  const getAuditInsignt = () => {
    const currentFilters = {
      businessSegment,
      subSegment,
      region,
      country,
      division,
      managingOffice,
      client,
      location,
    };
    const queryString = buildQueryString(currentFilters);

    if (insightProjectName.includes(ProjectNameInsight.harBour)) {
      props.getAuditInSight(queryString, false);
    }
    if (insightProjectName.includes(ProjectNameInsight.IFMhub)) {
      props.getAuditInSight(queryString, true);
    }
  };

  const getAuditActionItems = () => {
    const currentFilters = {
      businessSegment,
      subSegment,
      region,
      country,
      division,
      managingOffice,
      client,
      location,
    };

    const queryString = buildQueryString(currentFilters);
    console.log("titpeeee", title);
    props.getAuditActionItems(queryString, title.value);
  };
  const getData = () => {
    switch (sectionTypes) {
      case SectionType.AuditAction:
        return getAuditActionItems();
      case SectionType.AuditSummary:
        return getAuditSummury();
      case SectionType.AuditSiteInsights:
        return getAuditInsignt();
      case SectionType.Recommendation:
        return getRecommendation();
      default:
        return getauditType();
    }
  };

  const onProjectSelect = (projectNameNew: ProjectName) => {
    if (projectName.includes(projectNameNew)) {
      setProjectName(projectName.filter((item) => item !== projectNameNew));
    } else {
      setProjectName([...projectName, projectNameNew]);
    }
  };

  const onInsightProjectSelect = (projectNameNew: any) => {
    if (insightProjectName.includes(projectNameNew)) {
      setInsightProjectName(
        insightProjectName.filter((item) => item !== projectNameNew)
      );
    } else {
      setInsightProjectName([...insightProjectName, projectNameNew]);
    }
  };

  const getAuditSummaryDropDown = () => {
    return (
      <Row>
        <Col xs={6} md={3} lg={4}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.BusinessSegment)
            }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.segment.isLoading}
            onInputChange={(e: any) => onTextInputChange(e, "customer")}
            options={getFilterOptionsData("customer")}
            value={customer}
            onChange={(e) => onSelectionChange(e, "customer")}
            filterOption={() => {
              return true;
            }}
            label={"Customer"}
          />
        </Col>
        <Col xs={6} md={3} lg={4}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            loadingMessage={(obj: any) => "Please Wait"}
            isLoading={props.subBusinessSegment.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.SubBusinessSegment)
            }
            options={getFilterOptionsData("project")}
            value={project}
            onChange={(e) => onSelectionChange(e, "project")}
            filterOption={() => {
              return true;
            }}
            label={"Project/Contaract"}
          />
        </Col>
        <Col xs={6} md={3} lg={4}>
          <FloatingLabelSelect
            onMenuScrollToBottom={() =>
              handleScroll(ScopeFilterAttributeEnum.Region)
            }
            loadingMessage={"Please Wait"}
            isLoading={props.region.isLoading}
            onInputChange={(e: any) =>
              onTextInputChange(e, ScopeFilterAttributeEnum.Region)
            }
            options={getFilterOptionsData("building")}
            value={building}
            onChange={(e) => onSelectionChange(e, "building")}
            filterOption={() => {
              return true;
            }}
            // onFocus={() =>
            //   getFilterOptions(
            //     ScopeFilterAttribute[ScopeFilterAttribute.Region]
            //   )
            // }
            label={"Building"}
          />
        </Col>
      </Row>
    );
  };
  const renderAuditSummmary = () => {
    return (
      <>
        <div className="chips">
          <div
            className={`${
              projectName.includes(ProjectName.webQuote) ? "chip-selected" : ""
            } chip`}
            onClick={() => onProjectSelect(ProjectName.webQuote)}
          >
            <span>WebQuote</span>
          </div>
          <div
            className={`${
              projectName.includes(ProjectName.ePermits) ? "chip-selected" : ""
            } chip`}
            onClick={() => onProjectSelect(ProjectName.ePermits)}
          >
            <span>ePermits</span>
          </div>
          <div
            className={`${
              projectName.includes(ProjectName.elogBooks) ? "chip-selected" : ""
            } chip`}
            onClick={() => onProjectSelect(ProjectName.elogBooks)}
          >
            <span>elogBooks</span>
          </div>
        </div>
        {getAuditSummaryDropDown()}
      </>
    );
  };

  const renderAuditInsite = () => {
    return (
      <>
        <div className="chips">
          <div
            className={`${
              insightProjectName.includes(ProjectNameInsight.harBour)
                ? "chip-selected"
                : ""
            } chip`}
            onClick={() => onInsightProjectSelect(ProjectNameInsight.harBour)}
          >
            <span>Harbour</span>
          </div>
          <div
            className={`${
              insightProjectName.includes(ProjectNameInsight.IFMhub)
                ? "chip-selected"
                : ""
            } chip`}
            onClick={() => onInsightProjectSelect(ProjectNameInsight.IFMhub)}
          >
            <span>IFM Hub</span>
          </div>
        </div>
        {getFilters()}

        <div className="chips">
          <h4>Get Audit Insight for</h4>
          <div
            className={`chip ${
              selectedMonth === Months["3Months"] ? "chip-selected" : ""
            }`}
            onClick={() => getMonths(Months["3Months"])}
          >
            <span>3 Months</span>
          </div>
          <div
            className={`chip ${
              selectedMonth === Months["6Months"] ? "chip-selected" : ""
            }`}
            onClick={() => getMonths(Months["6Months"])}
          >
            <span>6 Months</span>
          </div>
        </div>
      </>
    );
  };

  const getAuditActionFilters = () => {
    return (
      <>
        <Row>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.BusinessSegment)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.segment.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.BusinessSegment)
              }
              options={getFilterOptionsData(
                ScopeFilterAttributeEnum.BusinessSegment
              )}
              value={businessSegment}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.BusinessSegment)
              }
              filterOption={() => {
                return true;
              }}
              label={"Segment"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.SubBusinessSegment)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.subBusinessSegment.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(
                  e,
                  ScopeFilterAttributeEnum.SubBusinessSegment
                )
              }
              options={getFilterOptionsData(
                ScopeFilterAttributeEnum.SubBusinessSegment
              )}
              value={subSegment}
              onChange={(e) =>
                onSelectionChange(
                  e,
                  ScopeFilterAttributeEnum.SubBusinessSegment
                )
              }
              filterOption={() => {
                return true;
              }}
              label={"Sub Segment"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Region)
              // }
              loadingMessage={"Please Wait"}
              isLoading={props.region.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Region)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Region)}
              value={region}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Region)
              }
              filterOption={() => {
                return true;
              }}
              label={"Region"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Country)
              // }
              loadingMessage={"Please Wait"}
              isLoading={props.country.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Country)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Country)}
              value={country}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Country)
              }
              label={"Country"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Division)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.division.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Division)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Division)}
              value={division}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Division)
              }
              filterOption={() => {
                return true;
              }}
              label={"Sector"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.ManagingOffice)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.managingOffice.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.ManagingOffice)
              }
              options={getFilterOptionsData(
                ScopeFilterAttributeEnum.ManagingOffice
              )}
              value={managingOffice}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.ManagingOffice)
              }
              filterOption={() => {
                return true;
              }}
              label={"Managing Office"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Client)
              // }
              loadingMessage={(obj: any) => " Please Wait"}
              isLoading={props.client.isLoading}
              //  isDisabled={isDisabled(level)}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Client)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Client)}
              value={client}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Client)
              }
              filterOption={() => {
                return true;
              }}
              label={"Client"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Location)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.location.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Location)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Location)}
              value={location}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Location)
              }
              filterOption={() => {
                return true;
              }}
              label={"Location"}
            />
          </Col>
          <Col xs={6} md={3} lg={3}>
            <FloatingLabelSelect
              // onMenuScrollToBottom={() =>
              //   handleScroll(ScopeFilterAttributeEnum.Location)
              // }
              loadingMessage={(obj: any) => "Please Wait"}
              isLoading={props.location.isLoading}
              onInputChange={(e: any) =>
                onTextInputChange(e, ScopeFilterAttributeEnum.Title)
              }
              options={getFilterOptionsData(ScopeFilterAttributeEnum.Title)}
              value={title}
              onChange={(e) =>
                onSelectionChange(e, ScopeFilterAttributeEnum.Title)
              }
              filterOption={() => {
                return true;
              }}
              label={"Audit Title"}
            />
          </Col>
        </Row>
      </>
    );
  };
  const renderSection = () => {
    switch (sectionTypes) {
      case SectionType.AuditAction:
        return <div>{getAuditActionFilters()}</div>;
      case SectionType.AuditSummary:
        return <div>{renderAuditSummmary()}</div>;
      case SectionType.AuditSiteInsights:
        return <div>{renderAuditInsite()}</div>;
      case SectionType.Recommendation:
        return <div>{getElogbooksDropdowns()}</div>;
    }
  };
  console.log("===<", props.ePermitsData);

  const renderMarkDown = () => {
    console.log("Actions data", props.auditActionItems);
    switch (sectionTypes) {
      case SectionType.AuditAction:
        return <ReactMarkdown>{props.auditActionItems}</ReactMarkdown>;
      case SectionType.AuditSummary:
        return (
          <>
            {projectName.includes(ProjectName.ePermits) && (
              <>
                {props.ePermitsData && props.ePermitsData.length > 0 && (
                  <>
                    <h3>ePermits </h3>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Permit</th>
                          <th>Permit Type</th>
                          <th>Status</th>
                          <th>Vendoe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.ePermitsData?.map((item: any) => {
                          return (
                            <tr>
                              <td>{item.Permit}</td>
                              <td>{item.PermitType}</td>
                              <td>{item.Status}</td>
                              <td>{item.Vendor}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </>
            )}

            {projectName.includes(ProjectName.webQuote) && (
              <>
                {props.webQuotesData && props.webQuotesData.length > 0 && (
                  <>
                    <h3>WebQuote </h3>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Category</th>
                          <th>Group Description</th>
                          <th>SubGroup Description</th>
                          <th>Status</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.webQuotesData?.map((item: any) => {
                          return (
                            <tr>
                              <td>{item.category}</td>
                              <td>{item.groupDescription || "NA"}</td>
                              <td>{item.subGroupDescription || "NA"}</td>
                              <td>{item.status}</td>
                              <td>{item.description}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
                )}
              </>
            )}

            {projectName.includes(ProjectName.elogBooks) && (
              <>
                <h3>elogBooks</h3>
                <ReactMarkdown>{props.elogBooksData}</ReactMarkdown>
              </>
            )}
          </>
        );
      case SectionType.AuditSiteInsights:
        if (
          insightProjectName.includes(ProjectNameInsight.harBour) &&
          insightProjectName.includes(ProjectNameInsight.IFMhub)
        ) {
          return (
            <>
              <h3>Harbour Summary</h3>
              <ReactMarkdown>{props.auditInsight}</ReactMarkdown>
              {/* <ReactMarkdown>{props.incidentInsight}</ReactMarkdown> */}
              <h3>IFM hub Summary</h3>
              <ReactMarkdown>{props.ifmHubInsight}</ReactMarkdown>
            </>
          );
        } else if (insightProjectName.includes(ProjectNameInsight.IFMhub)) {
          return (
            <>
              <h3>IFM hub Summary</h3>
              <ReactMarkdown>{props.ifmHubInsight}</ReactMarkdown>
            </>
          );
        } else if (insightProjectName.includes(ProjectNameInsight.harBour)) {
          return (
            <>
              <h3>Harbour Summary</h3>
              <ReactMarkdown>{props.auditInsight}</ReactMarkdown>
              <ReactMarkdown>{props.incidentInsight}</ReactMarkdown>
            </>
          );
        }

      case SectionType.Recommendation:
        return <ReactMarkdown>{props.recommendations}</ReactMarkdown>;
    }
  };

  return (
    <>
      {
        <section className="scope-filters">
          <Card>
            <CardBody>
              <>
                <div>
                  <span>
                    <span
                      className={`material-symbols-outlined`}
                      // onClick={() => {
                      //   onAddDate();
                      // }}
                    >
                      {"search"}
                    </span>
                  </span>
                  <span className="header">
                    <strong>Search</strong>
                  </span>
                </div>
                {/* <FloatingLabelSelect
                  onMenuScrollToBottom={() =>
                    handleScroll(ScopeFilterAttributeEnum.Location)
                  }
                  loadingMessage={(obj: any) => "Please Wait"}
                  isLoading={props.location.isLoading}
                  onInputChange={(e: any) =>
                    onTextInputChange(e, ScopeFilterAttributeEnum.Location)
                  }
                  options={getDropdown()}
                  value={sectionTypes}
                  onChange={(e) =>
                    //onSelectionChange(e, ScopeFilterAttributeEnum.Location)
                    setSectionTypes(e)
                  }
                  filterOption={() => {
                    return true;
                  }}
                  // onFocus={() =>
                  //   getFilterOptions(
                  //     ScopeFilterAttribute[ScopeFilterAttribute.Location]
                  //   )
                  // }
                  label={"Type"}
                /> */}
                <div className="btn-group">
                  <div
                    className={`button-sections ${
                      sectionTypes === SectionType.Recommendation
                        ? "button-sections__active"
                        : ""
                    }`}
                    onClick={() => getSection(SectionType.Recommendation)}
                  >
                    <span>Recommendations</span>
                  </div>
                  <div
                    className={`button-sections ${
                      sectionTypes === SectionType.AuditAction
                        ? "button-sections__active"
                        : ""
                    }`}
                    onClick={() => getSection(SectionType.AuditAction)}
                  >
                    <span>Audit Action Items</span>
                  </div>
                  <div
                    className={`button-sections ${
                      sectionTypes === SectionType.AuditSummary
                        ? "button-sections__active"
                        : ""
                    }`}
                    onClick={() => getSection(SectionType.AuditSummary)}
                  >
                    <span>Audit Summary</span>
                  </div>
                  <div
                    className={`button-sections ${
                      sectionTypes === SectionType.AuditSiteInsights
                        ? "button-sections__active"
                        : ""
                    }`}
                    onClick={() => getSection(SectionType.AuditSiteInsights)}
                  >
                    <span>Audit/Site Insight</span>
                  </div>
                </div>
                {renderSection()}
              </>
            </CardBody>
            <CardFooter>
              {sectionTypes && (
                <>
                  {" "}
                  <button className={`button`} onClick={() => getData()}>
                    <span className={"label"}>{getLabel()}</span>
                  </button>
                </>
              )}
            </CardFooter>
          </Card>
        </section>
      }

      <section className="markdown">
        <Card>
          <CardBody>
            <div>
              <span>
                <span
                  className={`material-symbols-outlined`}
                  // onClick={() => {
                  //   onAddDate();
                  // }}
                >
                  <img src={magicButtom} alt="wand_stars" />
                </span>
              </span>
              <span className="header">
                <strong>AI Generated</strong>
              </span>
            </div>
            {props.isLoading ? (
              <div className="spinner"><Spinner></Spinner></div>
            ) : (
              <>{renderMarkDown()}</>
            )}
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export const ScopeFilters = ScopeFiltersComponent;

import { TimeStamp } from "models/timestamp";

export interface BaseErrorState{
  errors: string[];
}

export const defaultErrorState: BaseErrorState = {
  errors: []
}

export interface BaseLoadingState extends BaseErrorState {
  isLoading: boolean;
}

export interface ContinuationTokenState extends BaseLoadingState {
  continuationToken: string;
}

export const defaultLoadingState: BaseLoadingState = {
  ...defaultErrorState,
  isLoading: false
};

export const defaultContinuationTokenState: ContinuationTokenState = {
  ...defaultLoadingState,
  continuationToken: ""
};

export const defaultTimeStampState: TimeStamp = {
  createdDate: new Date(),
  lastUpdatedDate: new Date(),
  createdByUserId: "",
  lastModifiedByUserId: "",
}
export const sectionTypes = {
  new: "new",
  read: "read",
}
import { History, createBrowserHistory } from "history";

const history: History = createBrowserHistory();

export const appHistory = (): History => {
  return history;
};

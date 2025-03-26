import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { DefaultLayout } from "./sections/default/defaultLayout.tsx";
import { appHistory } from "./sections/app-history.ts";
import { ScopeFilters } from "./sections/scopeFilters/scopeFilters";
import { ScopeFiltersContainer } from "./sections/scopeFilters/container.ts";
import "./index.scss"

// Lazy load screen implementation

interface IRoutes {
  //intl: IntlShape;
  children?: React.ReactNode;
}
export const history = appHistory();

class App extends React.Component<IRoutes> {
  public state = {
    isOpen: false,
  };

  public render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            component={() => (
              <DefaultLayout
                isHidden={false}
                sideMenuDockable={false}
                page="home"
              >
                <ScopeFiltersContainer hierarchyFilters={undefined} setHierarchyFilters={undefined} />
              </DefaultLayout>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

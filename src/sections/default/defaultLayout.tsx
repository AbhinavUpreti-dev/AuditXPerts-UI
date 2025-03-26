import * as React from "react";
import Header from "../header/index.tsx";
import "./defaultLayout.scss";


interface DefaultLayoutProps extends React.PropsWithChildren {
  children: any//JSX.Element | JSX.Element[];
  isHidden: boolean | false;
  fluid?: boolean;
  permission?: any[];
  sideMenuDockable?: boolean | true;
  page?: string | false;
  isStopScrolling?: boolean;
  isScrollable?: boolean | true;
}

interface DefaultLayoutState {
  sidebarOpen: boolean;
  notificationDropDownOpen: boolean;
  notificationDropDownVisible: boolean;
}

const mql = window.matchMedia(`(min-width: 992px)`);

const overlayStyles: any = {
  overlay: {
    zIndex: "2"
  },
  sidebar: {
    zIndex: "10",
    display: "flex",
    overflow: "visible"
  }
};

export class DefaultLayoutComponent extends React.PureComponent<DefaultLayoutProps, DefaultLayoutState> {
  public constructor(props: DefaultLayoutProps) {
    super(props);
    this.state = {
      sidebarOpen: false,
      notificationDropDownOpen: false,
      notificationDropDownVisible: mql.matches
    };
  }

  public static defaultProps = {
    isHidden: false
  }

  private toggleSideMenu = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  };

  private toggleNotificationDropDown = () => {
    this.setState({
      notificationDropDownOpen: !this.state.notificationDropDownOpen
    });
  };

  private onSetSidebarOpen = (open: any) => {
    this.setState({ sidebarOpen: open });
  };

  private mediaQueryChanged = () => {
    this.setState({
      notificationDropDownVisible: mql.matches, notificationDropDownOpen: false
    });
  };



  public render() {
    const attr: { [k: string]: any } = {};
    if (this.props.page) attr.className = `page-${this.props.page}`;
    return (
      <>
        <div {...attr}>
          {/* <Sidebar
            contentId={this.props.isStopScrolling ? "non-scroll" : "scroll"}
            sidebar={<SideNavContainer isOpen={this.state.sidebarOpen} />}
            open={this.state.sidebarOpen}
            styles={overlayStyles}
            onSetOpen={this.onSetSidebarOpen}
            contentClassName={this.props.isStopScrolling ? "default-layout-wrapper--nonScroll" : ""}
          > */}
            <Header
            toggleMenu={() => this.toggleSideMenu()}
            sideMenuDocked={false}
            toggleNotification={() => this.toggleNotificationDropDown()}
            showNotificationDropDown={this.state.notificationDropDownVisible}
            isNotificationOpen={this.state.notificationDropDownOpen} isConnected={false} />
            <React.Suspense >
              <div className={this.props.fluid ?
                "default-layout-wrapper default-layout-wrapper--fluid" :
                "default-layout-wrapper"}>
                {this.props.children}
              </div>
            </React.Suspense>
         {/* / </Sidebar> */}
        </div>
      </>
    );
  }
}

export const DefaultLayout = DefaultLayoutComponent;
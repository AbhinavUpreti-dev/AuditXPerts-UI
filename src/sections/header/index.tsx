import * as React from "react";
import { NavbarToggler, Nav } from "reactstrap";
import logoUrl from "assets/icons/CBREHarbour-logo-white.svg"
import notifyBell from "assets/icons/notifyBell.svg";
import "./header.scss";
import { Link } from "react-router-dom";

export interface HeaderProps {
  sideMenuDocked: boolean;
  toggleMenu(): void;
  toggleNotification(): void;
  isNotificationOpen: boolean;
  showNotificationDropDown: boolean;
  isConnected: boolean;
}
const Header = React.memo((props: HeaderProps) => {
  const {
    isNotificationOpen,
    toggleNotification,
    showNotificationDropDown,
    toggleMenu,
    sideMenuDocked,
    isConnected,
  } = props;
  const menuDockedClassName = sideMenuDocked ? 'header-nav--menu-docked' : 'header-nav--menu-undocked';
 
  return (
    <nav className={`header-nav ${menuDockedClassName}`}>
      <div className="header-nav-actions-navbar">
        <Nav className="ml-auto" navbar />
      
      </div>
      <div className="header-nav__logo logo-url">
       <Link className="header-nav__actions-logo" to={"/"}>
       <span >Audit Expert</span>
       
     </Link>
      </div>
      <div className="header-nav__actions">
        <div className={isConnected ? "visible" : "invisible position-absolute"}> <span title="Online" className="header-nav__actions-app-online" /></div>
        <div className={isConnected ? "invisible position-absolute " : "visible"}> <span title="Offline" className="header-nav__actions-app-offline" /></div>
      </div>
    </nav>
  );
});


export default Header


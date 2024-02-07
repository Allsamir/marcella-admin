/* eslint-disable prettier/prettier */
import { cilBell, cilMenu } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import logo from "../assets/brand/logo.png";
import { changeState } from "src/redux/sidebar/sidebarSlice";
import { AppHeaderDropdown } from "./header/index";
import { AppBreadcrumb } from "./index";

const AppHeader = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth) || {};
  const { sidebarShow } = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(changeState({ type: "side", sidebarShow: !sidebarShow }))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none bg-white" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/order" component={NavLink}>
              Orders
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink to="/settings" component={NavLink}>
              Settings
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>{email}</CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;

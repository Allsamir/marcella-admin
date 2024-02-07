/* eslint-disable prettier/prettier */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";
import { changeState } from "src/redux/sidebar/sidebarSlice";
import logo from "../assets/brand/logo.png";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const { sidebarShow, unfoldable } = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(changeState({ sidebarShow: visible }));
      }}
      style={{ backgroundColor: "#212529" }}
    >
      <CSidebarBrand className="d-none d-md-flex bg-white border p-2" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
        <CImage
          className="sidebar-brand-full px-4"
          src={logo}
          alt="brand logo"
          // height={90}
          fluid
        />
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(changeState({ type: "fold", unfoldable: !unfoldable }))}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

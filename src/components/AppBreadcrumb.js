/* eslint-disable prettier/prettier */
import React from "react";
import { Link, useLocation } from "react-router-dom";

import routes from "../routes";

import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { useSelector } from "react-redux";

const AppBreadcrumb = () => {
  const { role } = useSelector((state) => state?.auth) || {};

  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split("/").reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const route = getRouteName(currentPathname, routes);
      route &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: route.name,
          isAdmin: route.isAdmin,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <CBreadcrumb className="m-0 ms-2">
      <Link to="/" className="text-decoration-none ">
        Home /
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <Link
            className="text-decoration-none"
            to={breadcrumb.pathname}
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            &nbsp; {breadcrumb.name}
          </Link>
        );
      })}
    </CBreadcrumb>
  );
};

export default React.memo(AppBreadcrumb);

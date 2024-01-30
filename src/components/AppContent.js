import { CContainer, CSpinner } from "@coreui/react";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes config
import routes from "../routes";
import { useSelector } from "react-redux";
import AdminRoute from "./auth/AdminRoute";

const AppContent = () => {
  const { role } = useSelector((state) => state.auth) || {};

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map(({ element: Component, path, isAdmin, name }, idx) => {
            return (
              Component &&
              (!isAdmin ? (
                <Route
                  key={idx}
                  path={path}
                  // exact={exact}
                  name={name}
                  element={<Component />}
                />
              ) : (
                <Route
                  key={idx}
                  path={path}
                  // exact={exact}
                  name={name}
                  element={
                    <AdminRoute>
                      <Component />
                    </AdminRoute>
                  }
                />
              ))
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);

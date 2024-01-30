import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import "react-toastify/dist/ReactToastify.css";
import "./scss/style.scss";
import Loading from "./ui/Loading";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <Loading></Loading>
  ) : (
    <>
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="*"
              name="Home"
              element={
                <PrivateRoute>
                  <DefaultLayout />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/login"
              name="Login Page"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            {/* <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            /> */}
            <Route
              exact
              path="/400"
              name="Page 404"
              element={
                <PublicRoute>
                  <Page404 />
                </PublicRoute>
              }
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              element={
                <PublicRoute>
                  <Page500 />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
};

export default App;

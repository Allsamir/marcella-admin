/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "src/hooks/useAtuh";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();

  return !isLoggedIn ? children : <Navigate to="/dashboard" />;
}

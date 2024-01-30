import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth) || {};

  return role === "manager" ? <Navigate to="/" /> : children;
};

export default AdminRoute;

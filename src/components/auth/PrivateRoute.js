import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "src/hooks/useAtuh";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

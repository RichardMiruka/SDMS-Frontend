import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/Login" />;
  }
  return children;
};
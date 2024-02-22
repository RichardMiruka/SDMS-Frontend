import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    sessionStorage.setItem('intendedDestination', window.location.pathname);
    return <Navigate to="/Login" />;
  }
  return children;
};
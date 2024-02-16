import React from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({ path, element: Element }) => {
  const { isAuthenticated, redirectPath } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    // If not authenticated, set the redirect path and navigate to login
    // The redirect path will be stored in the AuthContext during login
    return <Navigate to={`/login?redirect=${encodeURIComponent(path)}`} />;
  }

  return <Route path={path} element={<Element />} />;
};

export default PrivateRoute;
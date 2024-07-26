import React from 'react';
import { useAuthValue } from './assets/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthValue();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;

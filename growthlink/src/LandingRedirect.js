import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from './AuthContext';

const LandingRedirect = ({ children }) => {
  const { isLoggedIn, signOut } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      signOut();
      navigate('/');
    }
  }, [isLoggedIn, signOut, navigate]);

  return children;
};

export default LandingRedirect;

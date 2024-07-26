import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from './assets/AuthContext';

const LandingRedirect = ({ children }) => {
  const { isLoggedIn } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home'); 
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default LandingRedirect;

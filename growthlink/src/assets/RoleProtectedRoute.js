import { Navigate } from 'react-router-dom';
import { useAuthValue } from './AuthContext';

const RoleProtectedRoute = ({ requiredRole, children }) => {
    const { isLoggedIn, user } = useAuthValue();

    if (!isLoggedIn) {
        // Redirect to landing page if not logged in
        return <Navigate to="/" />;
    }

    if (user?.role !== requiredRole) {
        // Redirect to landing page if role does not match
        return <Navigate to="/" />;
    }

    return children;
};

export default RoleProtectedRoute;

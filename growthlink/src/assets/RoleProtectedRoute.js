import React from 'react';
import { useAuthValue } from './AuthContext'; 

const RoleProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useAuthValue();

    if (user && user.role === requiredRole) {
        return children;
    } else {
        return <div>Access Denied</div>; 
    }
};

export default RoleProtectedRoute;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Role } from '../types/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to their appropriate dashboard if they try to access unauthorized page
        if (user.role === 'ROLE_VENDOR') return <Navigate to="/dashboard/vendor" replace />;
        if (user.role === 'ROLE_COUPLE') return <Navigate to="/dashboard/couple" replace />;
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

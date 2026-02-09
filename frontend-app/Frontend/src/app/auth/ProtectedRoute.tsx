import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Role } from '../types/auth';

/**
 * Props for the ProtectedRoute component.
 */
// interface for the protected route component
interface ProtectedRouteProps {
    /** The child components to render if access is granted. */
    children: ReactNode;
    /** Optional array of roles allowed to access this route. If undefined, any authenticated user can access. */
    allowedRoles?: Role[];
}

/**
 * A wrapper component that protects routes based on authentication status and user roles.
 * 
 * - Redirects unauthenticated users to the login page.
 * - Redirects authenticated users with insufficient permissions to their specific dashboard or home.
 * - Shows a loading state while authentication is being checked.
 */
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner/text while auth state is being determined
    // if loading, show loading screen
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // If user is not logged in, redirect to login page
    // preserve the current location in state to redirect back after login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // specific role check: if allowedRoles is provided, ensure user has one of them
    // if user is not allowed, redirect to their appropriate dashboard
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to their appropriate dashboard if they try to access unauthorized page
        if (user.role === 'ROLE_VENDOR') return <Navigate to="/dashboard/vendor" replace />;
        if (user.role === 'ROLE_COUPLE') return <Navigate to="/dashboard/couple" replace />;

        // Fallback for unknown roles
        return <Navigate to="/" replace />;
    }

    // If all checks pass, render the protected content
    // if user is allowed, render the children

    // if user is not allowed, redirect to their appropriate dashboard
    return <>{children}</>;
}

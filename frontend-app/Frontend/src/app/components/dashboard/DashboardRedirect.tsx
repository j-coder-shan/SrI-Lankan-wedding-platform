import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export function DashboardRedirect() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (user?.role === 'ROLE_VENDOR') {
        return <Navigate to="/dashboard/vendor" replace />;
    }

    if (user?.role === 'ROLE_COUPLE') {
        return <Navigate to="/dashboard/couple" replace />;
    }

    // Fallback if role is unknown or active
    return <Navigate to="/" replace />;
}

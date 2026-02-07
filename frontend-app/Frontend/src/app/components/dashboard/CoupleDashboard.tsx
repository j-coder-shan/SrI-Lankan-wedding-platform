import React from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Navbar } from '../Navbar';

export function CoupleDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Couple Dashboard</h1>
                    <p className="text-gray-600 mb-4">Welcome back, {user?.fullName || user?.email}!</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-lg bg-pink-50">
                            <h3 className="font-semibold text-pink-900">My Enquiries</h3>
                            <p className="text-sm text-pink-700">Track your venue/vendor requests</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-indigo-50">
                            <h3 className="font-semibold text-indigo-900">Chat</h3>
                            <p className="text-sm text-indigo-700">Messages from vendors</p>
                        </div>
                    </div>
                    <Button onClick={logout} variant="outline" className="mt-6">Sign Out</Button>
                </div>
            </div>
        </div >
    );
}

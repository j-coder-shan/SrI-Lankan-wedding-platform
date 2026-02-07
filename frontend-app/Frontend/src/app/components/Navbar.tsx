import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function AuthButton() {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <Link to="/login">
                <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50">
                    Login
                </Button>
            </Link>
        );
    }

    const dashboardLink = user?.role === 'ROLE_VENDOR' ? '/dashboard/vendor' : '/dashboard/couple';

    return (
        <div className="flex items-center gap-4">
            <Link to={dashboardLink}>
                <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50">
                    {user?.fullName || user?.email || 'Dashboard'}
                </Button>
            </Link>
        </div>
    );
}

export function Navbar() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                        <span className="text-2xl font-semibold text-gray-900">WeddingHub</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/vendors" className="text-gray-700 hover:text-rose-500 transition-colors">
                            Vendors
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-rose-500 transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-rose-500 transition-colors">
                            Contact
                        </Link>
                        {/* Dynamic Auth Button */}
                        <AuthButton />
                    </nav>

                </div>
            </div>
        </header >
    );
}

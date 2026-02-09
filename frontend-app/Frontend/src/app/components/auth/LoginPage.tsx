import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
// Card components removed
import { ArrowLeft } from 'lucide-react';

/**
 * LoginPage Component
 * 
 * Handles user authentication via email and password.
 * - Manages form state (email, password, error, loading).
 * - Uses AuthContext to perform the login action.
 * - Redirects to the dashboard upon successful login.
 * - Displays error messages if login fails.
 */
export function LoginPage() {
    // State for form inputs and UI status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Hooks for auth and navigation
    const { login } = useAuth();
    const navigate = useNavigate();

    /**
     * Handles the form submission.
     * Attempts to log the user in and redirects on success.
     * Catches and displays any errors returned from the auth service.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login({ email, password });
            navigate('/dashboard'); // Redirect to dashboard after login
        } catch (err: any) {
            console.error(err);
            // Extract error message from API response or use default
            setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">

                {/* Left Side - Image Section */}
                {/* Visible only on medium screens and up */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Wedding Venue"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Plan Your Perfect Day</h2>
                        <p className="text-lg text-gray-200">Access thousands of premium vendors and make your dream wedding a reality.</p>
                    </div>
                </div>

                {/* Right Side - Login Form Section */}
                <div className="flex flex-col justify-center p-8 md:p-12 relative">
                    {/* Back Button */}
                    <Button
                        variant="ghost"
                        className="absolute top-4 left-4 md:left-8 text-gray-500 hover:text-gray-900"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Button>

                    <div className="mx-auto w-full max-w-sm space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                            <p className="text-gray-500">Sign in to access your wedding dashboard</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-base">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 text-lg focus-visible:ring-rose-500"
                                    />
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password" className="text-base">Password</Label>
                                        <Link to="/forgot-password" className="text-sm font-medium text-rose-500 hover:text-rose-600">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-12 text-lg focus-visible:ring-rose-500"
                                    />
                                </div>
                            </div>

                            {/* Error Message Display */}
                            {error && (
                                <div className="p-3 rounded-md bg-red-50 text-sm text-red-600 border border-red-200 text-center">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>

                        {/* Register Link */}
                        <div className="text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold text-rose-600 hover:text-rose-500 hover:underline">
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

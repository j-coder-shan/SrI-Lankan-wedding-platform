import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
// Card components removed
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft } from 'lucide-react';

/**
 * RegisterPage Component
 * 
 * Handles user registration for new accounts.
 * - Collects user details: Full Name, Email, Password, Phone, and Role.
 * - Supports two roles: 'ROLE_COUPLE' (default) and 'ROLE_VENDOR'.
 * - Uses AuthContext to perform the registration action.
 * - Redirects to the dashboard upon successful registration.
 */
export function RegisterPage() {
    // State to hold all form data in a single object
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        role: 'ROLE_COUPLE'
    });

    // UI state for errors and loading status
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Hooks for auth actions and navigation
    const { register } = useAuth();
    const navigate = useNavigate();

    /**
     * Updates formData state when input fields change.
     * Uses the input's 'id' attribute to identify which field to update.
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    /**
     * Specific handler for the Role Select component.
     * Updates the 'role' field in formData.
     */
    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    }

    /**
     * Handles form submission.
     * Prevents default form behavior, calls the register function from AuthContext,
     * and handles success (redirect) or failure (show error).
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Cast formData to any to match the expected type if necessary, 
            // though keeping strict types is better practice.
            await register(formData as any);
            navigate('/dashboard');
        } catch (err: any) {
            console.error(err);
            // Display friendly error message
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[700px]">

                {/* Left Side - Image Section */}
                {/* Visible only on medium screens and larger */}
                <div className="relative hidden md:block">
                    <img
                        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwY291cGxlfGVufDB8fHx8MTc2NjQwNzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Happy Couple"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">Begin Your Journey</h2>
                        <p className="text-lg text-gray-200">Join our community to connect with top-rated vendors and plan your perfect celebration.</p>
                    </div>
                </div>

                {/* Right Side - Register Form Section */}
                <div className="flex flex-col justify-center p-8 md:p-12 relative overflow-y-auto max-h-[700px]">
                    {/* Back to Home Button */}
                    <Button
                        variant="ghost"
                        className="absolute top-4 left-4 md:left-8 text-gray-500 hover:text-gray-900"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Button>

                    <div className="mx-auto w-full max-w-sm space-y-6 mt-8">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                            <p className="text-gray-500">Join thousands of couples and vendors</p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Full Name Input */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="h-11 focus-visible:ring-rose-500"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="h-11 focus-visible:ring-rose-500"
                                />
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    placeholder="+94 77 123 4567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="h-11 focus-visible:ring-rose-500"
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label htmlFor="role">I am a...</Label>
                                <Select onValueChange={handleRoleChange} defaultValue={formData.role}>
                                    <SelectTrigger className="h-11 focus:ring-rose-500">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ROLE_COUPLE">Couple (I'm planning a wedding)</SelectItem>
                                        <SelectItem value="ROLE_VENDOR">Vendor (I offer services)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    className="h-11 focus-visible:ring-rose-500"
                                />
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
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </form>

                        {/* Sign In Link */}
                        <div className="text-center text-sm text-gray-600 pb-4">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold text-rose-600 hover:text-rose-500 hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

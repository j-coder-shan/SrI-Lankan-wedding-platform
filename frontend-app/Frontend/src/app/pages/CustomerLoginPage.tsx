import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export default function CustomerLoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log('Customer Login Data:', data);
        alert('Customer Login functionality to be implemented.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side - Image/Branding */}
                <div className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/80 to-purple-600/80"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                        <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                        <p className="text-rose-100">Login to finalize your dream wedding plans.</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    {/* Role Switcher */}
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-8">
                        <div className="w-1/2 text-center py-2 rounded-md bg-white shadow-sm text-sm font-medium text-rose-600 cursor-default">
                            For Couples
                        </div>
                        <Link to="/vendor/login" className="w-1/2 text-center py-2 rounded-md hover:bg-white/50 text-sm font-medium text-gray-500 transition-all">
                            For Vendors
                        </Link>
                    </div>

                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Sign In</h3>
                        <p className="text-gray-500 text-sm mt-2">Access your couple dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                placeholder="you@example.com"
                            />
                            {errors.email && <span className="text-rose-500 text-xs">{String(errors.email.message)}</span>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link to="#" className="text-xs text-rose-500 hover:text-rose-600 font-medium">Forgot Password?</Link>
                            </div>
                            <Input
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                type="password"
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-rose-500 text-xs">{String(errors.password.message)}</span>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" className="data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
                            <Label htmlFor="remember-me" className="text-sm font-normal text-gray-600">Remember me</Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-rose-600 hover:text-rose-500 transition-colors">
                                Sign up
                            </Link>
                        </p>
                        <p className="text-xs text-gray-400 mt-4">
                            Are you a vendor? <Link to="/vendor/login" className="text-rose-500 hover:underline">Vendor Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

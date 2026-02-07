import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function VendorSignupPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');

    const onSubmit = (data: any) => {
        const payload = { ...data, role: 'vendor' }; // Hardcoded role
        console.log('Vendor Signup Data:', payload);
        alert('Vendor Application functionality to be implemented.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100/50 overflow-hidden flex flex-col md:flex-row-reverse shadow-rose-100/50">

                {/* Right Side - Image/Branding */}
                <div className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
                    <div className="absolute inset-0 bg-gradient-to-bl from-purple-700/80 to-rose-600/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-sm">Partner With Us</h2>
                        <p className="text-rose-50 text-lg font-light">Reach thousands of couples and grow your wedding business.</p>
                    </div>
                </div>

                {/* Left Side - Signup Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    {/* Role Switcher */}
                    <div className="flex bg-rose-50 p-1 rounded-full mb-8 border border-rose-100">
                        <Link to="/signup" className="w-1/2 text-center py-2 rounded-full hover:bg-white/50 text-sm font-medium text-gray-500 transition-all hover:text-rose-500">
                            For Couples
                        </Link>
                        <div className="w-1/2 text-center py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-rose-600 cursor-default ring-1 ring-black/5">
                            For Vendors
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Vendor Registration</h3>
                        <p className="text-gray-500 text-sm mt-2">Create your business account</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-gray-700">Business/Contact Name</Label>
                            <Input
                                id="fullName"
                                {...register('fullName', { required: 'Name is required' })}
                                placeholder="Business Name or Contact Person"
                                className="border-rose-200 focus-visible:ring-rose-500/20"
                            />
                            {errors.fullName && <span className="text-rose-500 text-xs font-medium">{String(errors.fullName.message)}</span>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">Business Email</Label>
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
                                placeholder="business@example.com"
                                className="border-rose-200 focus-visible:ring-rose-500/20"
                            />
                            {errors.email && <span className="text-rose-500 text-xs font-medium">{String(errors.email.message)}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">Password</Label>
                                <Input
                                    id="password"
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                    type="password"
                                    placeholder="••••••••"
                                    className="border-rose-200 focus-visible:ring-rose-500/20"
                                />
                                {errors.password && <span className="text-rose-500 text-xs font-medium">{String(errors.password.message)}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    type="password"
                                    placeholder="••••••••"
                                    className="border-rose-200 focus-visible:ring-rose-500/20"
                                />
                                {errors.confirmPassword && <span className="text-rose-500 text-xs font-medium">{String(errors.confirmPassword.message)}</span>}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white mt-4 shadow-lg shadow-rose-500/30 transition-all hover:shadow-rose-500/40"
                        >
                            Register Business
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already registered?{' '}
                            <Link to="/vendor/login" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';

export default function VendorLoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        console.log('Vendor Login Data:', data);
        alert('Vendor Login functionality to be implemented.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-rose-100/50 overflow-hidden flex flex-col md:flex-row shadow-rose-100/50">

                {/* Left Side - Image/Branding */}
                <div className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 to-purple-700/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
                        <h2 className="text-4xl font-bold mb-4 drop-shadow-sm">Grow Your Business</h2>
                        <p className="text-rose-50 text-lg font-light">Login to manage your listings and connect with couples.</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    {/* Role Switcher */}
                    <div className="flex bg-rose-50 p-1 rounded-full mb-8 border border-rose-100">
                        <Link to="/login" className="w-1/2 text-center py-2 rounded-full hover:bg-white/50 text-sm font-medium text-gray-500 transition-all hover:text-rose-500">
                            For Couples
                        </Link>
                        <div className="w-1/2 text-center py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-rose-600 cursor-default ring-1 ring-black/5">
                            For Vendors
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Vendor Sign In</h3>
                        <p className="text-gray-500 text-sm mt-2">Access your business dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-gray-700">Password</Label>
                                <Link to="#" className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors">Forgot Password?</Link>
                            </div>
                            <Input
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                type="password"
                                placeholder="••••••••"
                                className="border-rose-200 focus-visible:ring-rose-500/20"
                            />
                            {errors.password && <span className="text-rose-500 text-xs font-medium">{String(errors.password.message)}</span>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" className="border-rose-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
                            <Label htmlFor="remember-me" className="text-sm font-normal text-gray-600">Remember me</Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white shadow-lg shadow-rose-500/30 transition-all hover:shadow-rose-500/40"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            New to WeddingHub?{' '}
                            <Link to="/vendor/signup" className="font-semibold text-rose-600 hover:text-rose-700 transition-colors">
                                Apply as a Vendor
                            </Link>
                        </p>
                        <p className="text-xs text-gray-400 mt-4">
                            Are you a couple? <Link to="/login" className="text-rose-500 hover:text-rose-600 hover:underline transition-colors">Couple Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

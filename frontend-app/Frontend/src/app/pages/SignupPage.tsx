import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function SignupPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password');

    const onSubmit = (data: any) => {
        console.log('Signup Data:', data);
        alert('Signup functionality to be implemented.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row-reverse">

                {/* Right Side - Image/Branding */}
                <div className="w-full md:w-1/2 bg-cover bg-center h-64 md:h-auto relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560982-1351cdeb9821?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}>
                    <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/80 to-rose-500/80"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                        <h2 className="text-3xl font-bold mb-2">Join Our Family</h2>
                        <p className="text-rose-100">Start your journey with us and grow your wedding business today.</p>
                    </div>
                </div>

                {/* Left Side - Signup Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Create Account</h3>
                        <p className="text-gray-500 text-sm">Fill in your details to register</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                {...register('fullName', { required: 'Name is required' })}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <span className="text-red-500 text-xs">{String(errors.fullName.message)}</span>}
                        </div>

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
                            {errors.email && <span className="text-red-500 text-xs">{String(errors.email.message)}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })}
                                    type="password"
                                    placeholder="••••••••"
                                />
                                {errors.password && <span className="text-red-500 text-xs">{String(errors.password.message)}</span>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                    type="password"
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <span className="text-red-500 text-xs">{String(errors.confirmPassword.message)}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role">I am a...</Label>
                            <select
                                {...register('role', { required: 'Role is required' })}
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="vendor">Wedding Vendor</option>
                                <option value="couple">Couple</option>
                            </select>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-700 hover:to-rose-600 text-white mt-2"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

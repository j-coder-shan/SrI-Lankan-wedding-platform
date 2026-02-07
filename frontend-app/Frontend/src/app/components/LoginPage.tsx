import React from 'react';
import { User, Store } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h1>
                    <p className="text-gray-600 text-lg">Choose your account type to continue</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    {/* User Login Card */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-rose-500" onClick={() => navigate('/login/user')}>
                        <CardHeader className="text-center pb-2">
                            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-rose-500" />
                            </div>
                            <CardTitle className="text-2xl">User Login</CardTitle>
                            <CardDescription>Plan your dream wedding</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button className="w-full bg-rose-500 hover:bg-rose-600">
                                Login as User
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Vendor Login Card */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-violet-500" onClick={() => navigate('/login/vendor')}>
                        <CardHeader className="text-center pb-2">
                            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Store className="w-8 h-8 text-violet-500" />
                            </div>
                            <CardTitle className="text-2xl">Vendor Login</CardTitle>
                            <CardDescription>Manage your business</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <Button className="w-full bg-violet-500 hover:bg-violet-600">
                                Login as Vendor
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { api } from '../data/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface AnalyticsData {
    totalRevenue: number;
    totalBookings: number;
    monthlyRevenue: { month: string; amount: number }[];
}

export function VendorDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const vendorId = 1; // Mock Vendor ID for demo

    useEffect(() => {
        api.getVendorAnalytics(vendorId)
            .then(data => setData(data))
            .catch(err => {
                console.error(err);
                // Fallback mock data if API fails or is empty for demo
                setData({
                    totalRevenue: 150000,
                    totalBookings: 24,
                    monthlyRevenue: [
                        { month: 'Jan', amount: 12000 },
                        { month: 'Feb', amount: 19000 },
                        { month: 'Mar', amount: 15000 },
                        { month: 'Apr', amount: 22000 },
                        { month: 'May', amount: 28000 },
                        { month: 'Jun', amount: 25000 },
                    ]
                });
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
                    <p className="text-gray-600">Track your performance and grow your business.</p>
                </header>

                {loading ? (
                    <p>Loading analytics...</p>
                ) : (
                    <div className="grid gap-6">
                        {/* KPI Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">Rs. {data?.totalRevenue?.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{data?.totalBookings}</div>
                                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Analysis Chart */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Revenue Analysis</CardTitle>
                                <CardDescription>Monthly revenue overview for the current year.</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data?.monthlyRevenue}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value) => `Rs. ${Number(value).toLocaleString()}`}
                                            />
                                            <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}

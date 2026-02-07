import React, { useEffect, useState } from 'react';
import { api } from '../data/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface Enquiry {
    id: number;
    vendorId: number;
    coupleId: number;
    message: string;
    enquiryDate: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export function UserDashboard() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const userId = 1; // Mock User ID for demo

    useEffect(() => {
        api.getUserEnquiries(userId)
            .then(data => setEnquiries(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome, User!</h1>
                    <p className="text-gray-600">Prepare for your big day by managing your enquiries.</p>
                </header>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <span className="p-2 bg-rose-100 rounded-lg text-rose-600">
                                    <Calendar className="w-5 h-5" />
                                </span>
                                Your Cart (Enquiries)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <p>Loading enquiries...</p>
                            ) : enquiries.length === 0 ? (
                                <p className="text-gray-500">No enquiries found. Start browsing vendors!</p>
                            ) : (
                                <div className="space-y-4">
                                    {enquiries.map((enq) => (
                                        <div key={enq.id} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all">
                                            <div>
                                                <h3 className="font-semibold text-lg">Vendor Enquiry #{enq.vendorId}</h3>
                                                <p className="text-gray-600 text-sm mt-1">{enq.message}</p>
                                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                    <span>{new Date(enq.enquiryDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${enq.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                                        enq.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {enq.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

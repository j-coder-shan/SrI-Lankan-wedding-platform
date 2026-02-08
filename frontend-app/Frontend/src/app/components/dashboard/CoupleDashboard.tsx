import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Navbar } from '../Navbar';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function CoupleDashboard() {
    const { user, logout } = useAuth();
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const data = await enquiryService.getCoupleEnquiries();
                // Handle potential different response structures (Array vs Page)
                if (Array.isArray(data)) {
                    setEnquiries(data);
                } else if ((data as any).content) {
                    setEnquiries((data as any).content);
                } else {
                    setEnquiries([]);
                }
            } catch (error) {
                console.error("Failed to fetch enquiries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white shadow rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Couple Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.fullName || user?.email}!</p>
                        </div>
                        <Button onClick={logout} variant="outline">Sign Out</Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">My Booking Requests</h2>

                    {loading ? (
                        <p>Loading enquiries...</p>
                    ) : enquiries.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-gray-500">
                                You haven't sent any booking requests yet.
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {enquiries.map((enquiry) => (
                                <Card key={enquiry.id} className="hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-medium truncate" title={enquiry.listingTitleSnapshot}>
                                                {enquiry.listingTitleSnapshot || `Request #${enquiry.id}`}
                                            </CardTitle>
                                            <Badge variant={
                                                enquiry.status === 'APPROVED' ? 'default' :
                                                    enquiry.status === 'REJECTED' ? 'destructive' : 'secondary'
                                            } className={
                                                enquiry.status === 'APPROVED' ? 'bg-green-600 hover:bg-green-700' :
                                                    enquiry.status === 'REJECTED' ? 'bg-red-600 hover:bg-red-700' :
                                                        'bg-yellow-500 hover:bg-yellow-600 text-white'
                                            }>
                                                {enquiry.status === 'APPROVED' ? 'ACCEPTED' :
                                                    enquiry.status === 'REJECTED' ? 'DECLINED' : enquiry.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-sm space-y-2 text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Date:</span>
                                                <span className="font-medium text-gray-900">{new Date(enquiry.eventDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Guests:</span>
                                                <span className="font-medium text-gray-900">{enquiry.guestCount}</span>
                                            </div>
                                            {enquiry.message && (
                                                <div className="pt-2">
                                                    <p className="text-xs uppercase font-semibold text-gray-400 mb-1">Your Message</p>
                                                    <p className="bg-gray-50 p-2 rounded italic text-gray-700">{enquiry.message}</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

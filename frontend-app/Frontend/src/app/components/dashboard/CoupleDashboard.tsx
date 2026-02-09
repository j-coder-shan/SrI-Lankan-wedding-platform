import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Users, MessageSquare } from 'lucide-react';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-10">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur rounded-xl shadow-lg p-6 border border-white/50">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Couple Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.fullName || user?.email}!</p>
                        </div>
                        <Button onClick={logout} variant="outline" className="hover:bg-rose-50 hover:text-rose-600 border-rose-200">Sign Out</Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-rose-500" />
                        <h2 className="text-2xl font-bold text-gray-900">My Booking Requests</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading enquiries...</p>
                        </div>
                    ) : enquiries.length === 0 ? (
                        <Card className="border-dashed border-2 border-gray-200 bg-white/50">
                            <CardContent className="py-12 text-center text-gray-500">
                                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-lg">You haven't sent any booking requests yet.</p>
                                <p className="text-sm text-gray-400 mt-1">Browse vendors and start planning your wedding!</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {enquiries.map((enquiry) => (
                                <Card key={enquiry.id} className="hover:shadow-xl transition-all duration-300 border-t-4 border-t-rose-400 group bg-white/90 backdrop-blur-sm">
                                    <CardHeader className="pb-3 border-b border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-bold truncate text-gray-900 group-hover:text-rose-600 transition-colors" title={enquiry.listingTitleSnapshot}>
                                                {enquiry.listingTitleSnapshot || `Request #${enquiry.id}`}
                                            </CardTitle>
                                            <Badge variant={
                                                enquiry.status === 'ACCEPTED' ? 'default' :
                                                    enquiry.status === 'DECLINED' ? 'destructive' : 'secondary'
                                            } className={
                                                enquiry.status === 'ACCEPTED' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                                                    enquiry.status === 'DECLINED' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                                                        'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            }>
                                                {enquiry.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <div className="text-sm space-y-3 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-rose-400" />
                                                <span className="font-medium text-gray-900">{new Date(enquiry.eventDate).toLocaleDateString(undefined, {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-blue-400" />
                                                <span><span className="font-medium text-gray-900">{enquiry.guestCount}</span> Guests</span>
                                            </div>

                                            {enquiry.message && (
                                                <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
                                                    <div className="flex items-center gap-2 mb-2 text-xs uppercase font-bold text-gray-400">
                                                        <MessageSquare className="w-3 h-3" />
                                                        <span>Your Message</span>
                                                    </div>
                                                    <p className="bg-gray-50 p-3 rounded-lg italic text-gray-600 text-sm border border-gray-100">
                                                        "{enquiry.message}"
                                                    </p>
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
            <Footer />
        </div>
    );
}

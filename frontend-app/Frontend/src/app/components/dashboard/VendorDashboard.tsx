import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { Button } from '../ui/button';
import { Navbar } from '../Navbar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { listingService } from '../../services/listingService';
import { Listing } from '../../types/listing';
import { toast } from 'sonner';
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ImageUpload } from '../ui/ImageUpload';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { enquiryService } from '../../services/enquiryService';
import { Enquiry } from '../../types/enquiry';
import chatService from '../../services/chatService';
import { VendorMessageResponse } from '../../types/message';

export function VendorDashboard() {
    const { user, logout } = useAuth();
    const [listings, setListings] = useState<Listing[]>([]);
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]); // State for enquiries
    const [messages, setMessages] = useState<VendorMessageResponse[]>([]); // State for messages
    const [loading, setLoading] = useState(false);
    const [isEnquiriesOpen, setIsEnquiriesOpen] = useState(false); // Modal state
    const [isMessagesOpen, setIsMessagesOpen] = useState(false); // Messages modal state
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [messageToDelete, setMessageToDelete] = useState<string | null>(null); // Message ID to delete

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priceMin: '',
        priceMax: '',
        district: '',
        city: '',
        category: '',
        imageUrls: '', // Comma separated for now
        details: '{}'
    });

    const fetchListings = async () => {
        try {
            const data = await listingService.getVendorListings();
            if (Array.isArray(data)) {
                setListings(data);
            } else {
                console.error("Received invalid listings data:", data);
                setListings([]);
                toast.error("Failed to load listings: Invalid response format.");
            }
        } catch (error) {
            console.error("Failed to fetch listings", error);
            // toast.error("Failed to fetch listings");
        }
    };

    const fetchEnquiries = async () => {
        try {
            const data = await enquiryService.getVendorEnquiries();
            // Check if data has content content (since Page<Enquiry> returns { content: [...] })
            // Or if it returns direct array. The service says Enquiry[], but let's be safe.
            // Based earlier service file it returns response.data which is Enquiry[].
            // But Controller returns Page<Enquiry> (Task 1.3 View).
            // Page JSON structure: { content: [], pageable: ... }
            // Let's assume for a moment the service type definition is slightly off or the controller return type wraps it.
            // If the controller returns Page, response.data will be the Page object.
            // Let's handle both array and page structure just in case, or fix the service.
            // Actually, checking EnquiryController: getVendorEnquiries returns Page<Enquiry>.
            // So response.data is { content: [...] }.
            // We need to fix the service or handle it here. Let's fix it here for now by checking property.
            if (data && (data as any).content) {
                setEnquiries((data as any).content);
            } else if (Array.isArray(data)) {
                setEnquiries(data);
            } else {
                setEnquiries([]);
            }
        } catch (error) {
            console.error("Failed to fetch enquiries", error);
        }
    };

    useEffect(() => {
        // Debug/Validation Check for Token
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log("Current Token Payload:", payload);

                const isExpired = payload.exp && payload.exp * 1000 < Date.now();
                if (!payload.userId || isExpired) {
                    toast.error("Your session has expired. Please Sign Out and Login again.");
                    // Optional: You could auto-logout here
                    // localStorage.removeItem('token');
                    // localStorage.removeItem('user');
                    // navigate('/login'); 
                }
            } catch (e) {
                console.error("Failed to parse token", e);
            }
        }
        fetchListings();
        fetchEnquiries();
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const data = await chatService.getVendorMessages();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };

    const handleDeleteMessage = async () => {
        if (!messageToDelete) return;

        try {
            await chatService.deleteMessage(messageToDelete);
            toast.success('Message deleted successfully');
            fetchMessages(); // Refresh the list
            setMessageToDelete(null); // Close the dialog
        } catch (error) {
            console.error('Failed to delete message', error);
            toast.error('Failed to delete message');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                priceMin: Number(formData.priceMin),
                priceMax: Number(formData.priceMax),
                imageUrls: formData.imageUrls.split(',').map(url => url.trim()).filter(url => url.length > 0)
            };

            await listingService.createListing(payload);
            toast.success("Listing created successfully!");
            setFormData({
                title: '',
                description: '',
                priceMin: '',
                priceMax: '',
                district: '',
                city: '',
                category: '',
                imageUrls: '',
                details: '{}'
            });
            fetchListings(); // Refresh list
        } catch (error) {
            console.error("Failed to create listing", error);
            toast.error("Failed to create listing. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await listingService.deleteListing(deleteId);
            toast.success('Listing deleted successfully');
            fetchListings();
        } catch (error) {
            console.error('Failed to delete listing', error);
            toast.error('Failed to delete listing');
        } finally {
            setDeleteId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

                {/* 1. Existing Dashboard Stats */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.fullName || user?.email}!</p>
                        </div>
                        <Button onClick={logout} variant="outline">Sign Out</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg bg-blue-50">
                            <h3 className="font-semibold text-blue-900">Analytics</h3>
                            <p className="text-sm text-blue-700">View your performance stats</p>
                        </div>
                        <div
                            className="p-4 border rounded-lg bg-green-50 cursor-pointer hover:bg-green-100 transition-colors"
                            onClick={() => setIsEnquiriesOpen(true)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-green-900">Enquiries</h3>
                                    <p className="text-sm text-green-700">Manage booking requests</p>
                                </div>
                                <span className="text-2xl font-bold text-green-800">{enquiries.length}</span>
                            </div>
                        </div>
                        <div
                            className="p-4 border rounded-lg bg-purple-50 cursor-pointer hover:bg-purple-100 transition-colors"
                            onClick={() => setIsMessagesOpen(true)}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-purple-900">Messages</h3>
                                    <p className="text-sm text-purple-700">View customer messages</p>
                                </div>
                                <span className="text-2xl font-bold text-purple-800">{messages.length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Add New Listing Form */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Add New Listing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required placeholder="Ex: Grand Ball Room" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select onValueChange={(val) => handleSelectChange('category', val)} value={formData.category}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="VENUE">Venue</SelectItem>
                                            <SelectItem value="PHOTOGRAPHER">Photography</SelectItem>
                                            <SelectItem value="SALON">Salon</SelectItem>
                                            <SelectItem value="DRESS">Dresses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceMin">Min Price (LKR)</Label>
                                    <Input id="priceMin" name="priceMin" type="number" value={formData.priceMin} onChange={handleInputChange} placeholder="10000" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="priceMax">Max Price (LKR)</Label>
                                    <Input id="priceMax" name="priceMax" type="number" value={formData.priceMax} onChange={handleInputChange} placeholder="50000" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="district">District</Label>
                                    <Input id="district" name="district" value={formData.district} onChange={handleInputChange} placeholder="Colombo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="Mount Lavinia" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe your service..." rows={4} />
                            </div>

                            <div className="space-y-4">
                                <Label>Images</Label>
                                <ImageUpload onImagesUploaded={(urls) => {
                                    // Append new URLs to the existing string list (comma separated)
                                    const currentUrls = formData.imageUrls ? formData.imageUrls.split(',').filter(u => u.length > 0) : [];
                                    const newUrls = [...currentUrls, ...urls];
                                    setFormData(prev => ({ ...prev, imageUrls: newUrls.join(',') }));
                                }} />

                                {/* Image Previews */}
                                {formData.imageUrls && (
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {formData.imageUrls.split(',').filter(url => url.length > 0).map((url, index) => (
                                            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden group">
                                                <img src={url} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const urls = formData.imageUrls.split(',');
                                                        const newUrls = urls.filter((_, i) => i !== index);
                                                        setFormData(prev => ({ ...prev, imageUrls: newUrls.join(',') }));
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 mt-4" disabled={loading}>
                                {loading ? 'Creating Listing...' : 'Create Listing'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* 3. My Listings */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {listings.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                You haven't added any listings yet.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {listings.map((listing) => (
                                    <div key={listing.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="h-48 bg-gray-200 relative group">
                                            {listing.imageUrls && listing.imageUrls.length > 0 ? (
                                                <img src={listing.imageUrls[0]} alt={listing.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ImageIcon className="w-8 h-8" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                                                {listing.category}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteId(listing.id);
                                                }}
                                                className="absolute top-2 left-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                title="Delete Listing"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2 truncate">{listing.description}</p>
                                            <div className="flex justify-between items-center text-sm text-gray-500">
                                                <span>{listing.city}</span>
                                                <span className="font-medium text-rose-600">{listing.priceMin} LKR +</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the listing
                                and remove its data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>

            {/* Enquiries Modal */}
            <Dialog open={isEnquiriesOpen} onOpenChange={setIsEnquiriesOpen}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Booking Enquiries ({enquiries.length})</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {enquiries.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No enquiries yet.</p>
                        ) : (
                            enquiries.map((enquiry) => (
                                <Card key={enquiry.id}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-lg">
                                                    {enquiry.listingTitleSnapshot || `Listing #${enquiry.listingId}`}
                                                </h4>
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Event Date: {new Date(enquiry.eventDate).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm"><strong>Guest Count:</strong> {enquiry.guestCount}</p>
                                                <div className="mt-2 text-sm text-gray-700">
                                                    <p><strong>Contact:</strong> {enquiry.coupleNameSnapshot || 'N/A'}</p>
                                                    <p><strong>Email:</strong> {enquiry.coupleEmailSnapshot || 'N/A'}</p>
                                                    <p><strong>Phone:</strong> {enquiry.couplePhoneSnapshot || 'N/A'}</p>
                                                </div>
                                                {enquiry.message && (
                                                    <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                                                        <p className="font-semibold text-xs text-gray-500 uppercase">Message</p>
                                                        <p>{enquiry.message}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold
                                                    ${enquiry.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                                        enquiry.status === 'DECLINED' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'}`}>
                                                    {enquiry.status}
                                                </span>

                                                {/* Action Buttons for PENDING status */}
                                                {enquiry.status === 'PENDING' && (
                                                    <div className="flex gap-2 mt-2">
                                                        <Button
                                                            size="sm"
                                                            className="bg-green-600 hover:bg-green-700 h-8"
                                                            onClick={async () => {
                                                                try {
                                                                    await enquiryService.updateStatus(enquiry.id, 'APPROVED');
                                                                    toast.success("Enquiry Accepted");
                                                                    fetchEnquiries(); // Refresh list
                                                                } catch (error) {
                                                                    console.error("Update failed", error);
                                                                    toast.error("Failed to update status");
                                                                }
                                                            }}
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            className="h-8"
                                                            onClick={async () => {
                                                                try {
                                                                    await enquiryService.updateStatus(enquiry.id, 'REJECTED');
                                                                    toast.info("Enquiry Declined");
                                                                    fetchEnquiries(); // Refresh list
                                                                } catch (error) {
                                                                    console.error("Update failed", error);
                                                                    toast.error("Failed to update status");
                                                                }
                                                            }}
                                                        >
                                                            Decline
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Messages Dialog */}
            <Dialog open={isMessagesOpen} onOpenChange={setIsMessagesOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Customer Messages</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No messages yet
                            </div>
                        ) : (
                            messages.map((message) => (
                                <Card key={message.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900">
                                                        {message.senderName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {message.listingTitle}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(message.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => setMessageToDelete(message.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="border-t pt-3">
                                                <p className="text-gray-700 whitespace-pre-wrap">
                                                    {message.messageContent}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Message Confirmation Dialog */}
            <AlertDialog open={!!messageToDelete} onOpenChange={(open) => !open && setMessageToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Message</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this message? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteMessage}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
}

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

export function VendorDashboard() {
    const { user, logout } = useAuth();
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(false);

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
            setListings(data);
        } catch (error) {
            console.error("Failed to fetch listings", error);
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
    }, []);

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
                        <div className="p-4 border rounded-lg bg-green-50">
                            <h3 className="font-semibold text-green-900">Enquiries</h3>
                            <p className="text-sm text-green-700">Manage booking requests</p>
                        </div>
                        <div className="p-4 border rounded-lg bg-purple-50">
                            <h3 className="font-semibold text-purple-900">Invoices</h3>
                            <p className="text-sm text-purple-700">Track payments</p>
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
                                            <SelectItem value="PHOTOGRAPHY">Photography</SelectItem>
                                            <SelectItem value="CATERING">Catering</SelectItem>
                                            <SelectItem value="DECOR">Decor</SelectItem>
                                            <SelectItem value="MUSIC">Music</SelectItem>
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
                                        <div className="h-48 bg-gray-200 relative">
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

            </div>
        </div>
    );
}

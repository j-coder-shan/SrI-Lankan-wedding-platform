import apiClient from '../api/client';
import { Vendor, Category } from '../App';
import { SearchListing } from '../types/api';

export const vendorService = {
    getAllVendors: async (category?: string, priceRange?: string) => {
        const params: any = {};

        // Map Frontend filters to Backend API params
        if (category && category !== 'all') {
            params.category = category;
        }

        // Map Price Range ($$) to Price Max (approximate logic)
        if (priceRange && priceRange !== 'all') {
            if (priceRange === '$$') params.userBudget = 100000;
            else if (priceRange === '$$$') params.userBudget = 250000;
            else if (priceRange === '$$$$') params.userBudget = 500000;
        }

        try {
            const response = await apiClient.get<SearchListing[]>('/api/search', { params });

            // Transform Backend Data to Frontend Model
            return response.data.map(transformListingToVendor);
        } catch (error) {
            console.error("Error fetching vendors:", error);
            throw error;
        }
    },

    getVendorById: async (id: number) => {
        // Note: SearchService doesn't have getById. 
        // We should ideally call ListingService for details, but for now let's use SearchService
        // or we can implement getById in ListingService later.
        // For this task, we will try to fetch details from ListingService (port 8083 -> Gateway /api/listings/{id})
        try {
            const response = await apiClient.get<any>(`/api/listings/${id}`);
            // Transform slightly different response from ListingService
            return {
                id: response.data.id,
                name: response.data.title,
                category: response.data.category as Category,
                description: response.data.description,
                image: response.data.images?.[0]?.url || 'https://via.placeholder.com/400', // Fallback
                rating: response.data.avgRating || 0,
                reviewCount: 0, // Missing in backend
                location: `${response.data.district}, ${response.data.city}`,
                priceRange: mapPriceToRange(response.data.priceMin, response.data.priceMax),
                featured: false // Missing in backend
            } as Vendor;
        } catch (error) {
            console.error("Error fetching vendor details:", error);
            throw error;
        }
    }
};

// Helper: Transform SearchListing -> Vendor
function transformListingToVendor(listing: SearchListing): Vendor {
    return {
        id: listing.id,
        name: listing.title,
        category: listing.category.toLowerCase() as Category, // Ensure lowercase matches enum
        description: listing.description,
        image: listing.mainImageUrl || 'https://via.placeholder.com/400',
        rating: listing.avgRating || 0,
        reviewCount: 0, // Not available in SearchListing
        location: listing.district, // Or combine with city if available
        priceRange: mapPriceToRange(listing.priceMin, listing.priceMax),
        featured: false // Not available
    };
}

// Helper: Map numeric price to $$ signs
function mapPriceToRange(min: number, max: number): string {
    const avg = (min + max) / 2;
    if (avg < 100000) return '$$'; // Moderate
    if (avg < 300000) return '$$$'; // Upscale
    return '$$$$'; // Luxury
}

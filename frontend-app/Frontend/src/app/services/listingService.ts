import client from '../api/client';
import { Listing } from '../types/listing';

export const listingService = {
    // Updated with correct API path
    getListingById: async (id: string | number): Promise<Listing> => {
        const response = await client.get(`/api/listings/${id}`);
        return response.data;
    },

    getAllListings: async (): Promise<Listing[]> => {
        // This might be for admin or public directory (Search Service handles public search usually)
        // But for direct listing service access:
        const response = await client.get('/api/listings');
        return response.data;
    },

    getVendorListings: async (): Promise<Listing[]> => {
        const response = await client.get('/api/listings/vendor/me');
        return response.data;
    },

    createListing: async (data: any) => {
        return client.post('/api/listings', data);
    }
};

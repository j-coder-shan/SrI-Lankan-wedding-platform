import client from '../api/client';
import { Enquiry, EnquiryRequest } from '../types/enquiry';

export const enquiryService = {
    // Couple creates enquiry
    createEnquiry: async (request: EnquiryRequest): Promise<Enquiry> => {
        const response = await client.post<Enquiry>('/api/enquiries', request);
        return response.data;
    },

    // Vendor fetches their enquiries
    getVendorEnquiries: async (): Promise<Enquiry[]> => {
        const response = await client.get<Enquiry[]>('/api/enquiries/vendor/me');
        return response.data;
    },

    // Couple fetches sent enquiries
    getCoupleEnquiries: async (): Promise<Enquiry[]> => {
        const response = await client.get<Enquiry[]>('/api/enquiries/couple/me');
        return response.data;
    },

    // Vendor updates status
    updateStatus: async (id: number, status: 'APPROVED' | 'REJECTED'): Promise<void> => {
        // Backend expects @RequestParam for status, so we send it in the URL query string
        // PATCH /api/enquiries/{id}/status?status=APPROVED
        await client.patch(`/api/enquiries/${id}/status`, null, {
            params: { status }
        });
    }
};

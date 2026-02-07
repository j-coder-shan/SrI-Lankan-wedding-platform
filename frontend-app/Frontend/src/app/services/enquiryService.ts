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
    updateStatus: async (id: number, status: 'ACCEPTED' | 'DECLINED'): Promise<void> => {
        await client.patch(`/api/enquiries/${id}/status`, { status });
    }
};

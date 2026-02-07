export const API_BASE_URL = '/api';

export const api = {
    async get(endpoint: string, token?: string) {
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async post(endpoint: string, body: any, token?: string) {
        const headers = {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        return response.json();
    },

    async getVendorAnalytics(vendorId: number) {
        // Pass ID as header as expected by backend controller
        const headers = { 'X-Auth-User-Id': vendorId.toString() };
        const response = await fetch(`${API_BASE_URL}/analytics/vendor/performance`, { headers });
        if (!response.ok) throw new Error(`Analytics Error`);
        return response.json();
    },

    async getUserEnquiries(userId: number) {
        const headers = { 'X-User-Id': userId.toString() };
        const response = await fetch(`${API_BASE_URL}/enquiries/couple/me`, { headers });
        if (!response.ok) throw new Error(`Enquiry Error`);
        return response.json();
    }
};

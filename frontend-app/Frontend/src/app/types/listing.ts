export interface Listing {
    id: number;
    vendorId: number;
    title: string;
    description: string;
    priceMin: number;
    priceMax: number;
    district: string;
    city: string;
    category: string;
    status: string;
    avgRating: number;
    imageUrls: string[];
    details?: any; // Category specific details
}

export interface ListingRequest {
    title: string;
    description: string;
    priceMin: number;
    priceMax: number;
    district: string;
    city: string;
    category: string;
    imageUrls: string[];
    details?: any;
}

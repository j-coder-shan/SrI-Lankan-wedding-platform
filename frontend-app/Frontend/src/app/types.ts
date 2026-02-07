export type Category = 'dress' | 'venue' | 'saloon' | 'photographer';

export interface Vendor {
    id: number;
    name: string;
    category: Category;
    description: string;
    image: string;
    rating: number;
    reviewCount: number;
    location: string;
    priceRange: string;
    featured?: boolean;
}

export interface Review {
    id: number;
    vendorId: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

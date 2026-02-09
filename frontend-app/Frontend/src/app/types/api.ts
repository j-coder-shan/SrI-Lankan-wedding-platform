export interface SearchListing {
    id: number;
    title: string;
    description: string;
    category: string;
    priceMin: number;
    priceMax: number;
    district: string;
    city: string;
    location: {
        x: number;
        y: number;
    } | null;
    avgRating: number;
    status: string;
    mainImageUrl: string;
}

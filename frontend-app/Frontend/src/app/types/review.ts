export interface Review {
    id: number;
    listingId: number;
    userId: number;
    rating: number;
    comment: string;
    createdAt: string; // ISO string
    userName?: string; // Optional, for display purposes
}

export interface ReviewRequest {
    listingId: number;
    rating: number;
    comment?: string;
}

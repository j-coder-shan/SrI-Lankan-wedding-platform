export interface Review {
    id: number;
    listingId: number;
    userId: number;
    rating: number;
    comment: string;
    date: string; // ISO string
    // TODO: Need username, but backend Review entity only has userId. 
    // Usually backend should return a DTO with userName or frontend fetches user.
    // For now, assume backend might populate it or we show "User #{userId}"
    userName?: string;
}

export interface ReviewRequest {
    userId: number;
    listingId: number;
    rating: number;
    comment: string;
}

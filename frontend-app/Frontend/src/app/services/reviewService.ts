import client from '../api/client';
import { Review, ReviewRequest } from '../types/review';

export const reviewService = {
    getReviewsByListing: async (listingId: number): Promise<Review[]> => {
        const response = await client.get<Review[]>(`/api/reviews/listing/${listingId}`);
        return response.data;
    },

    createReview: async (review: ReviewRequest): Promise<Review> => {
        const response = await client.post<Review>('/api/reviews', review);
        return response.data;
    }
};

package com.wedding.reviewService.service.impl;

import com.wedding.reviewService.client.ListingClient;
import com.wedding.reviewService.dto.RatingUpdateRequest;
import com.wedding.reviewService.dto.ReviewRequest;
import com.wedding.reviewService.entity.Review;
import com.wedding.reviewService.repository.ReviewRepository;
import com.wedding.reviewService.service.ReviewService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ListingClient listingClient;

    public ReviewServiceImpl(ReviewRepository reviewRepository, ListingClient listingClient) {
        this.reviewRepository = reviewRepository;
        this.listingClient = listingClient;
    }

    /**
     * Task 3.2 Logic: Save Review -> Calculate AVG -> Feign Sync to Listing
     * Service.
     */
    @Override
    @Transactional
    public Review createReviewAndSyncRating(ReviewRequest request) {

        // 1. Save the review.
        Review review = new Review();
        review.setListingId(request.getListingId());
        review.setUserId(request.getUserId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        // 2. Calculate average rating.
        Double avgRating = reviewRepository.calculateAverageRating(request.getListingId());

        if (avgRating != null) {
            // Round to 2 decimal places for accurate storage
            Double roundedAvgRating = Math.round(avgRating * 100.0) / 100.0;

            // 3. Sync: Use FeignClient to call listing-service.
            RatingUpdateRequest updateRequest = new RatingUpdateRequest(roundedAvgRating);

            try {
                // Feign call to update the central Listing Service database
                listingClient.updateListingRating(request.getListingId(), updateRequest);
            } catch (Exception e) {
                System.err.println("Error syncing rating to Listing Service for ID " + request.getListingId() + ": "
                        + e.getMessage());
            }
        }

        return savedReview;
    }
}

package com.example.ReviewService.controller;

import com.example.ReviewService.client.ListingClient;
import com.example.ReviewService.dto.RatingUpdateRequest;
import com.example.ReviewService.dto.ReviewRequest;
import com.example.ReviewService.entity.Review;
import com.example.ReviewService.repository.ReviewRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ListingClient listingClient;

    public ReviewController(ReviewRepository reviewRepository, ListingClient listingClient) {
        this.reviewRepository = reviewRepository;
        this.listingClient = listingClient;
    }

    /**
     * Task 3.2: Handles POST /api/reviews
     * Saves the review and triggers the rating sync logic.
     */
    @PostMapping
    @Transactional
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest reviewRequest) {

        // 1. Save the review.
        Review review = new Review();
        review.setListingId(reviewRequest.getListingId());
        review.setUserId(reviewRequest.getUserId());
        review.setRating(reviewRequest.getRating());
        review.setComment(reviewRequest.getComment());

        Review savedReview = reviewRepository.save(review);

        // 2. Run SQL query: SELECT AVG(rating) FROM review WHERE listing_id = ?.
        Double avgRating = reviewRepository.calculateAverageRating(reviewRequest.getListingId());

        if (avgRating != null) {
            // 3. Sync: Use FeignClient to call listing-service: PUT /api/listings/{id}/rating.
            RatingUpdateRequest updateRequest = new RatingUpdateRequest(
                    Math.round(avgRating * 100.0) / 100.0 // Round to 2 decimal places
            );

            try {
                // Feign call to update the central Listing Service database
                listingClient.updateListingRating(reviewRequest.getListingId(), updateRequest);
            } catch (Exception e) {
                // Crucial error handling: log and potentially trigger an async fallback
                System.err.println("Error syncing rating to Listing Service for ID " + reviewRequest.getListingId() + ": " + e.getMessage());
                // In a production system, you would use a transactional outbox pattern here.
            }
        }

        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
}
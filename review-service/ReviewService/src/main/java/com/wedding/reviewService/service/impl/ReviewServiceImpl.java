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

    @Override
    @Transactional
    public Review createReview(ReviewRequest request, Long userId) {

        Review review = new Review();
        review.setListingId(request.getListingId());
        review.setUserId(userId);
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        System.out.println("Saving review for listingId: " + request.getListingId());
        Review savedReview = reviewRepository.save(review);
        System.out.println("Review saved successfully with ID: " + savedReview.getId());

        try {
            Double avgRating = reviewRepository.calculateAverageRating(request.getListingId());
            if (avgRating != null) {
                Double roundedAvgRating = Math.round(avgRating * 100.0) / 100.0;
                System.out.println("Calculated average rating: " + roundedAvgRating);

                RatingUpdateRequest updateRequest = new RatingUpdateRequest(roundedAvgRating);
                listingClient.updateListingRating(request.getListingId(), updateRequest);
                System.out.println("Synced rating to Listing Service.");
            }
        } catch (Exception e) {
            // Log the error but DO NOT fail the transaction. The review is already saved.
            System.err.println(
                    "Error syncing rating to Listing Service for ID " + request.getListingId() + ": " + e.getMessage());
            e.printStackTrace();
        }

        return savedReview;
    }

    @Override
    public java.util.List<Review> getReviewsByListing(Long listingId) {
        return reviewRepository.findByListingId(listingId);
    }
}

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
    public Review createReviewAndSyncRating(ReviewRequest request) {

        Review review = new Review();
        review.setListingId(request.getListingId());
        review.setUserId(request.getUserId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());

        Review savedReview = reviewRepository.save(review);

        Double avgRating = reviewRepository.calculateAverageRating(request.getListingId());

        if (avgRating != null) {
            Double roundedAvgRating = Math.round(avgRating * 100.0) / 100.0;

            RatingUpdateRequest updateRequest = new RatingUpdateRequest(roundedAvgRating);

            try {
                listingClient.updateListingRating(request.getListingId(), updateRequest);
            } catch (Exception e) {
                System.err.println("Error syncing rating to Listing Service for ID " + request.getListingId() + ": "
                        + e.getMessage());
            }
        }

        return savedReview;
    }
}

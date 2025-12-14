package com.example.ReviewService.service;

import com.example.ReviewService.dto.ReviewRequest;
import com.example.ReviewService.entity.Review;

public interface ReviewService {

    /**
     * Saves a new review, calculates the updated average rating,
     * and synchronously triggers the update to the Listing Service.
     */
    Review createReviewAndSyncRating(ReviewRequest request);
}
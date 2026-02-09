package com.wedding.reviewService.service;

import com.wedding.reviewService.dto.ReviewRequest;
import com.wedding.reviewService.entity.Review;

import java.util.List;

public interface ReviewService {
    Review createReview(ReviewRequest reviewRequest, Long userId);

    List<Review> getReviewsByListing(Long listingId);
}

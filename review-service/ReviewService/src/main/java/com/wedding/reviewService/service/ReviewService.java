package com.wedding.reviewService.service;

import com.wedding.reviewService.dto.ReviewRequest;
import com.wedding.reviewService.entity.Review;

public interface ReviewService {
    Review createReviewAndSyncRating(ReviewRequest reviewRequest);
}

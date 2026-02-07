package com.wedding.reviewService.controller;

import com.wedding.reviewService.dto.ReviewRequest;
import com.wedding.reviewService.entity.Review;
import com.wedding.reviewService.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest reviewRequest) {
        Review savedReview = reviewService.createReviewAndSyncRating(reviewRequest);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }
}

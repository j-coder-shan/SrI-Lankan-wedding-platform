package com.wedding.reviewService.controller;

import com.wedding.reviewService.dto.ReviewRequest;
import com.wedding.reviewService.entity.Review;
import com.wedding.reviewService.service.ReviewService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Review> createReview(
            @Valid @RequestBody ReviewRequest reviewRequest,
            @RequestHeader("X-Auth-User-Id") Long userId) {
        Review savedReview = reviewService.createReview(reviewRequest, userId);
        return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
    }

    @GetMapping("/listing/{listingId}")
    public ResponseEntity<java.util.List<Review>> getReviewsByListing(@PathVariable Long listingId) {
        return ResponseEntity.ok(reviewService.getReviewsByListing(listingId));
    }
}

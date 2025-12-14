package com.example.ReviewService.dto;

import lombok.Data;

// DTO for incoming POST /api/reviews request
@Data
public class ReviewRequest {
    private Long listingId;
    private Long userId;
    private Integer rating;
    private String comment;
}

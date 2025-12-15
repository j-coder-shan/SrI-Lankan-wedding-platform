package com.wedding.reviewService.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long listingId;
    private Long userId;
    private Integer rating;
    private String comment;
}

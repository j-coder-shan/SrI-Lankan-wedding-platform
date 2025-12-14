package com.example.ReviewService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// DTO for syncing the new average rating to the Listing Service
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingUpdateRequest {
    private Double newAvgRating;
}

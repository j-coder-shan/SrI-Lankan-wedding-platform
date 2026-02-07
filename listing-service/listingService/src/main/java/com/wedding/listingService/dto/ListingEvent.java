package com.wedding.listingService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Event structure published to Kafka topic "listing-events" (Task 2.2)
 * Must match SearchService ListingEvent DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingEvent {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Double priceMin;
    private Double priceMax;
    private String district;
    private String status; // Changed from ListingStatus to String for Kafka
    private Double avgRating;
    private Double lat; // Latitude
    private Double lon; // Longitude
    private String mainImageUrl;
    private String operation; // CREATE, UPDATE, DELETE - Crucial for consumer logic
}

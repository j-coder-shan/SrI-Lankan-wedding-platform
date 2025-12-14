package com.wedding.listingService.dto;

import com.wedding.listingService.enums.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Event structure published to Kafka topic "listing-events" (Task 2.2)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingEvent {
    private Long id;
    private String title;
    private Double priceMin;
    private String district;
    private ListingStatus status;
    // Note: Lat/Lon fields would be added here in the actual event mapping
}

package com.wedding.listingService.dto;

import com.wedding.listingService.enums.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListingEvent {
    private Long id;
    private String title;
    private Double priceMin;
    private String district;
    private ListingStatus status;
}

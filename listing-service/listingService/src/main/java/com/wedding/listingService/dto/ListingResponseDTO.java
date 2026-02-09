package com.wedding.listingService.dto;

import com.wedding.listingService.enums.ListingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListingResponseDTO {

    private Long id;
    private Long vendorId;
    private String title;
    private String description;
    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;
    private String category;
    private ListingStatus status;
    private Double avgRating;
    
    private List<String> imageUrls;
    private Object details; 
}
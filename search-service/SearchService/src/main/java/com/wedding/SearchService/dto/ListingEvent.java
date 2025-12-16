package com.wedding.SearchService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String status;
    private Double avgRating;
    private Double lat; 
    private Double lon; 
    private String mainImageUrl;
    private String operation; 
}
package com.wedding.listingService.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
public class ListingRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;
    private String description;
    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;

    @NotBlank(message = "Category is required")
    private String category; 

    private String details; 
    private List<String> imageUrls;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CommonFields {
        private String title;
        private String description;
        private Double priceMin;
        private Double priceMax;
        private String district;
        private String city;
        private String category;
    }
}
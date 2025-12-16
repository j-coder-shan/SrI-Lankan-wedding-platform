package com.wedding.listingService.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wedding.listingService.dto.ListingResponseDTO;
import com.wedding.listingService.entity.Listing;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ListingMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

  
    public ListingResponseDTO toResponseDTO(Listing listing) {
        ListingResponseDTO.ListingResponseDTOBuilder builder = ListingResponseDTO.builder()
                .id(listing.getId())
                .vendorId(listing.getVendorId())
                .title(listing.getTitle())
                .description(listing.getDescription())
                .priceMin(listing.getPriceMin())
                .priceMax(listing.getPriceMax())
                .district(listing.getDistrict())
                .city(listing.getCity())
                .category(listing.getCategory())
                .status(listing.getStatus())
                .avgRating(listing.getAvgRating())
                .imageUrls(listing.getImages().stream().map(image -> image.getUrl()).collect(Collectors.toList()));

        try {
            
            builder.details(objectMapper.convertValue(listing, java.util.Map.class));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return builder.build();
    }
}
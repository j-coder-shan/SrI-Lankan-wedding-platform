package com.wedding.listingService.mapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wedding.listingService.dto.ListingResponseDTO;
import com.wedding.listingService.entity.Listing;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ListingMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Maps a Listing Entity (which may be a subclass like VenueDetails)
     * to a generic ListingResponseDTO for the frontend.
     */
    public ListingResponseDTO toResponseDTO(Listing listing) {
        // 1. Map common fields
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

        // 2. Map the category-specific details object
        try {
            // Because Listing is the base class for VenueDetails, SalonDetails, etc.,
            // the entity itself contains the unique details. We map the entire entity
            // into the generic 'details' object in the DTO using ObjectMapper.
            builder.details(objectMapper.convertValue(listing, java.util.Map.class));
        } catch (Exception e) {
            // Handle mapping exception: fallback to raw object or null
            e.printStackTrace();
            // potentially: builder.details(null);
        }

        return builder.build();
    }
}
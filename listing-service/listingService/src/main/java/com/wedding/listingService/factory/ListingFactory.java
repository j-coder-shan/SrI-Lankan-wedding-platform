package com.wedding.listingService.factory;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.entity.Listing;
import com.wedding.listingService.entity.details.*; 
import org.springframework.stereotype.Service;

@Service
public class ListingFactory {

    private final ObjectMapper objectMapper = new ObjectMapper(); 

    public Listing createListing(ListingRequestDTO dto) {
        
        try {
            String category = dto.getCategory().toUpperCase();
            
            Class<? extends Listing> targetClass;
            switch (category) {
                case "VENUE":
                    targetClass = VenueDetails.class;
                    break;
                case "PHOTOGRAPHER":
                    targetClass = PhotographerDetails.class;
                    break;
                case "SALON":
                    targetClass = SalonDetails.class;
                    break;
                case "DRESS":
                    targetClass = DressDetails.class;
                    break;
                default:
                    throw new IllegalArgumentException("Invalid listing category: " + dto.getCategory());
            }

            JsonNode categoryDetailsNode = objectMapper.readTree(dto.getDetails());
            
            ListingRequestDTO.CommonFields commonFields = new ListingRequestDTO.CommonFields(
                dto.getTitle(), dto.getDescription(), dto.getPriceMin(), dto.getPriceMax(),
                dto.getDistrict(), dto.getCity(), category
            );
            JsonNode commonFieldsNode = objectMapper.valueToTree(commonFields);
            
            ((ObjectNode) categoryDetailsNode).setAll((ObjectNode) commonFieldsNode);
            
            Listing listing = objectMapper.treeToValue(categoryDetailsNode, targetClass);
            
            listing.addImages(dto.getImageUrls());

            return listing;

        } catch (Exception e) {
            throw new RuntimeException("Error creating listing for category: " + dto.getCategory(), e);
        }
    }
}
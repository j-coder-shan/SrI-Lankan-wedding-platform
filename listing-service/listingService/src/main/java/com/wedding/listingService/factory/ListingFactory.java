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

            // 1. Determine the target Class
            Class<? extends Listing> targetClass;
            switch (category) {
                case "VENUE":
                    targetClass = VenueDetails.class;
                    break;
                case "PHOTOGRAPHER":
                case "PHOTOGRAPHY":
                    targetClass = PhotographerDetails.class;
                    break;
                case "SALON":
                case "SALOON":
                    targetClass = SalonDetails.class;
                    break;
                case "DRESS":
                case "DRESSES":
                    targetClass = DressDetails.class;
                    break;
                default:
                    throw new IllegalArgumentException("Invalid listing category: " + dto.getCategory());
            }

            // 2. Create JsonNode from the category-specific details (raw JSON string)
            JsonNode categoryDetailsNode = objectMapper.readTree(dto.getDetails());

            // 3. Create a temporary JsonNode for common fields using the inner DTO class
            ListingRequestDTO.CommonFields commonFields = new ListingRequestDTO.CommonFields(
                    dto.getTitle(), dto.getDescription(), dto.getPriceMin(), dto.getPriceMax(),
                    dto.getDistrict(), dto.getCity(), category);
            JsonNode commonFieldsNode = objectMapper.valueToTree(commonFields);

            // 4. Merge: Copy common fields into the details node
            ((ObjectNode) categoryDetailsNode).setAll((ObjectNode) commonFieldsNode);

            // 5. Final Deserialization: Convert the merged JsonNode into the correct entity
            Listing listing = objectMapper.treeToValue(categoryDetailsNode, targetClass);

            // 6. Add images
            listing.addImages(dto.getImageUrls());

            return listing;

        } catch (Exception e) {
            throw new RuntimeException("Error creating listing for category: " + dto.getCategory(), e);
        }
    }
}
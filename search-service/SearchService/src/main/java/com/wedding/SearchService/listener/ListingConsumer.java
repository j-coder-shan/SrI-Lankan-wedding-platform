package com.wedding.SearchService.listener;

import com.wedding.SearchService.document.SearchListing;
import com.wedding.SearchService.dto.ListingEvent;
import com.wedding.SearchService.repository.SearchListingRepository;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.kafka.annotation.KafkaListener; // Task 2.3: Listener Annotation
import org.springframework.lang.NonNull; // Import NonNull
import org.springframework.stereotype.Component;

@Component
public class ListingConsumer {

    private final SearchListingRepository searchListingRepository;

    public ListingConsumer(SearchListingRepository searchListingRepository) {
        this.searchListingRepository = searchListingRepository;
    }

    /**
     * Listens to the listing-events topic and syncs data to MongoDB (Task 2.3).
     */
    @SuppressWarnings("null")
    @KafkaListener(topics = "listing-events", groupId = "search-group-debug-FORCE-1") // Task 2.3: Force new group
    public void consumeListingEvent(ListingEvent event) {
        System.out.println("📥 Kafka Consumer Received Event: " + event);

        try {
            switch (event.getOperation().toUpperCase()) {
                case "CREATE":
                case "UPDATE":
                    // Logic: Map DTO to SearchListing document and repository.save() (Task 2.3)
                    if ("PUBLISHED".equalsIgnoreCase(event.getStatus())) {
                        SearchListing document = mapEventToDocument(event);
                        searchListingRepository.save(document);
                        System.out.println("✅ SYNC: Created/Updated SearchListing ID: " + event.getId()
                                + " | Category: " + document.getCategory()
                                + " | Status: " + document.getStatus());
                    } else {
                        // If status is PENDING/REJECTED, remove it from the search index
                        if (event.getId() != null) {
                            searchListingRepository.deleteById(event.getId());
                            System.out.println("⚠️ SYNC: Removed Listing ID: " + event.getId() + " (Status: "
                                    + event.getStatus() + ")");
                        }
                    }
                    break;

                case "DELETE":
                    // Logic: repository.deleteById() (Task 2.3)
                    if (event.getId() != null) {
                        searchListingRepository.deleteById(event.getId());
                        System.out.println("🗑️ SYNC: Deleted SearchListing ID: " + event.getId());
                    }
                    break;

                default:
                    System.out.println("❓ SYNC: Unknown operation type: " + event.getOperation());
            }
        } catch (Exception e) {
            System.err.println("❌ Error processing Kafka event: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @NonNull
    private SearchListing mapEventToDocument(ListingEvent event) {
        SearchListing document = new SearchListing();
        document.setId(event.getId());
        document.setTitle(event.getTitle());
        document.setDescription(event.getDescription());
        document.setCategory(event.getCategory());
        document.setPriceMin(event.getPriceMin());
        document.setPriceMax(event.getPriceMax());
        document.setDistrict(event.getDistrict());
        document.setAvgRating(event.getAvgRating());
        document.setStatus(event.getStatus());
        document.setMainImageUrl(event.getMainImageUrl());

        // Map Geo coordinates (Task 2.1)
        if (event.getLat() != null && event.getLon() != null) {
            // NOTE: GeoJsonPoint constructor takes (longitude, latitude)
            document.setLocation(new GeoJsonPoint(event.getLon(), event.getLat()));
        }

        return document;
    }
}
package com.wedding.SearchService.listener;

import com.wedding.SearchService.document.SearchListing;
import com.wedding.SearchService.dto.ListingEvent;
import com.wedding.SearchService.repository.SearchListingRepository;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.kafka.annotation.KafkaListener; 
import org.springframework.lang.NonNull; 
import org.springframework.stereotype.Component;

@Component
public class ListingConsumer {

    private final SearchListingRepository searchListingRepository;

    public ListingConsumer(SearchListingRepository searchListingRepository) {
        this.searchListingRepository = searchListingRepository;
    }

   
    @KafkaListener(topics = "listing-events", groupId = "search-group") 
    public void consumeListingEvent(ListingEvent event) {

        switch (event.getOperation().toUpperCase()) {
            case "CREATE":
            case "UPDATE":
                if ("PUBLISHED".equalsIgnoreCase(event.getStatus())) {
                    SearchListing document = mapEventToDocument(event);
                    searchListingRepository.save(document);
                    System.out.println("SYNC: Created/Updated SearchListing ID: " + event.getId());
                } else {
                    if (event.getId() != null) {
                        searchListingRepository.deleteById(event.getId());
                    }
                }
                break;

            case "DELETE":
                if (event.getId() != null) {
                    searchListingRepository.deleteById(event.getId());
                    System.out.println("SYNC: Deleted SearchListing ID: " + event.getId());
                }
                break;

            default:
                System.out.println("SYNC: Unknown operation type: " + event.getOperation());
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

        if (event.getLat() != null && event.getLon() != null) {
            document.setLocation(new GeoJsonPoint(event.getLon(), event.getLat()));
        }

        return document;
    }
}
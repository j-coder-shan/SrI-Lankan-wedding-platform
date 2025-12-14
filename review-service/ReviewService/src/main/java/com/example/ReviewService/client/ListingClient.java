package com.example.ReviewService.client;

import com.example.ReviewService.dto.RatingUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

// Task 3.2: FeignClient to call listing-service: PUT /api/listings/{id}/rating
@FeignClient(name = "listing-service") // Uses the Eureka Service Name
public interface ListingClient {

    @PutMapping("/api/listings/{id}/rating")
    void updateListingRating(@PathVariable("id") Long id, RatingUpdateRequest request);
}

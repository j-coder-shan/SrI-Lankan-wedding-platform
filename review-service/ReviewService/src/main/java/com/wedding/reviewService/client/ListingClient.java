package com.wedding.reviewService.client;

import com.wedding.reviewService.dto.RatingUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "listing-service") 
public interface ListingClient {

    @PutMapping("/api/listings/{id}/rating")
    void updateListingRating(@PathVariable("id") Long id, RatingUpdateRequest request);
}

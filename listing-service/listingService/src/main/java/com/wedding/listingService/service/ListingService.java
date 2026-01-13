// ListingService.java (Interface)
package com.wedding.listingService.service;

import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.dto.ListingResponseDTO;

import java.util.List;

public interface ListingService {
    
    // Task 1.2: Create listing
    void createListing(ListingRequestDTO requestDTO, Long vendorId);
    
    // Task 1.2: Update listing. Throws custom exceptions.
    void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId);
    
    // Task 3.2: Internal rating update
    void updateListingRating(Long listingId, Double newAvgRating);

    // Task 1.2: Get full details
    ListingResponseDTO getListingById(Long listingId);

    // Task 1.2: Get vendor's listings
    List<ListingResponseDTO> getVendorListings(Long vendorId);
}


// ListingService.java (Interface)
package com.wedding.listingService.service;

import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.dto.ListingResponseDTO;

import java.util.List;

public interface ListingService {

    void createListing(ListingRequestDTO requestDTO, Long vendorId);

    void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId);

    void updateListingRating(Long listingId, Double newAvgRating);

    ListingResponseDTO getListingById(Long listingId);

    List<ListingResponseDTO> getVendorListings(Long vendorId);

    List<ListingResponseDTO> getAllListings(String category);

    void deleteListing(Long listingId, Long vendorId);

    String uploadImage(org.springframework.web.multipart.MultipartFile file);
}

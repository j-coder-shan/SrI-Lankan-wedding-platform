// ListingService.java (Interface)
package com.wedding.listingService.service;

import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.dto.ListingResponseDTO;

import java.util.List;

/**
 * Service interface for managing vendor listings.
 * Defines operations for creating, updating, retrieving, and deleting listings.
 */
public interface ListingService {

    /**
     * Creates a new listing for a specific vendor.
     * 
     * @param requestDTO Data transfer object containing listing details.
     * @param vendorId   The ID of the vendor creating the listing.
     */
    void createListing(ListingRequestDTO requestDTO, Long vendorId);

    /**
     * Updates an existing listing.
     * 
     * @param listingId  The ID of the listing to update.
     * @param requestDTO Data transfer object containing updated listing details.
     * @param vendorId   The ID of the vendor owning the listing (for
     *                   authorization).
     * @throws RuntimeException if the listing is not found or does not belong to
     *                          the vendor.
     */
    void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId);

    /**
     * Updates the average rating of a listing.
     * Typically called internally or by a review service.
     * 
     * @param listingId    The ID of the listing to update.
     * @param newAvgRating The new calculated average rating.
     */
    void updateListingRating(Long listingId, Double newAvgRating);

    /**
     * Retrieves full details of a specific listing.
     * 
     * @param listingId The ID of the listing to retrieve.
     * @return ListingResponseDTO containing detailed listing information.
     */
    ListingResponseDTO getListingById(Long listingId);

    /**
     * Retrieves all listings belonging to a specific vendor.
     * 
     * @param vendorId The ID of the vendor.
     * @return A list of ListingResponseDTOs for the vendor.
     */
    List<ListingResponseDTO> getVendorListings(Long vendorId);

    /**
     * Retrieves all listings, optionally filtered by category.
     * Used for browsing listings without specific search criteria.
     * 
     * @param category Optional category filter. If null or empty, returns all
     *                 listings.
     * @return A list of ListingResponseDTOs.
     */
    List<ListingResponseDTO> getAllListings(String category);

    /**
     * Deletes a specific listing.
     * 
     * @param listingId The ID of the listing to delete.
     * @param vendorId  The ID of the vendor requesting the deletion (for
     *                  authorization).
     */
    void deleteListing(Long listingId, Long vendorId);

    /**
     * Uploads an image file and returns the accessible URL path.
     * 
     * @param file The image file to upload.
     * @return The URL or path to the uploaded image.
     */
    String uploadImage(org.springframework.web.multipart.MultipartFile file);
}

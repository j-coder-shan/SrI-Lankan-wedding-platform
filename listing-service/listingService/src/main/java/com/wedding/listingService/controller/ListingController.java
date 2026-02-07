package com.wedding.listingService.controller;

import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.dto.ListingResponseDTO;
import com.wedding.listingService.service.ListingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    private final ListingService listingService;
    private final com.wedding.listingService.service.FileStorageService fileStorageService;

    public ListingController(ListingService listingService,
            com.wedding.listingService.service.FileStorageService fileStorageService) {
        this.listingService = listingService;
        this.fileStorageService = fileStorageService;
    }

    // Task 2.5: Image Upload Endpoint
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        // Return the accessible URL via API Gateway (Port 8080)
        String fileUrl = "http://localhost:8080/api/listings/uploads/" + fileName;
        return ResponseEntity.ok(fileUrl);
    }

    /**
     * POST /api/listings: Create Listing (Task 1.2)
     * [cite_start]Extracts X-Auth-User-Id header for vendor Id. [cite: 18]
     */
    @PostMapping
    public ResponseEntity<Void> createListing(
            @Valid @RequestBody ListingRequestDTO requestDTO,
            @RequestHeader("X-Auth-User-Id") Long vendorId) {

        listingService.createListing(requestDTO, vendorId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * PUT /api/listings/{id}: Update fields. Ensure only the owner can update.
     * (Task 1.2) [cite_start][cite: 19]
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateListing(
            @PathVariable Long id,
            @Valid @RequestBody ListingRequestDTO requestDTO,
            @RequestHeader("X-Auth-User-Id") Long vendorId) {

        listingService.updateListing(id, requestDTO, vendorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * GET /api/listings/{id}: Return full details (Listing + Category Specifics).
     * (Task 1.2) [cite_start][cite: 21]
     */
    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDTO> getListingDetails(@PathVariable Long id) {
        ListingResponseDTO response = listingService.getListingById(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/listings/vendor/me: Return all listings for the logged-in vendor.
     * (Task 1.2) [cite_start][cite: 20]
     */
    @GetMapping("/vendor/me")
    public ResponseEntity<List<ListingResponseDTO>> getVendorListings(@RequestHeader("X-Auth-User-Id") Long vendorId) {
        List<ListingResponseDTO> listings = listingService.getVendorListings(vendorId);
        return ResponseEntity.ok(listings);
    }

    /**
     * [cite_start]PUT /api/listings/{id}/rating: Internal endpoint for Review
     * Service sync (Task 3.2)[cite: 59].
     */
    @PutMapping("/{id}/rating")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateListingRating(@PathVariable Long id, @RequestBody Double newAvgRating) {
        listingService.updateListingRating(id, newAvgRating);
    }
}
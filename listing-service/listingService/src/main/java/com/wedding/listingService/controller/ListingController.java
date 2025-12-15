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

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

  
    @PostMapping
    public ResponseEntity<Void> createListing(
            @Valid @RequestBody ListingRequestDTO requestDTO,
            @RequestHeader("X-Auth-User-Id") Long vendorId) { 
        
        listingService.createListing(requestDTO, vendorId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateListing(
            @PathVariable Long id,
            @Valid @RequestBody ListingRequestDTO requestDTO,
            @RequestHeader("X-Auth-User-Id") Long vendorId) { 

        listingService.updateListing(id, requestDTO, vendorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<ListingResponseDTO> getListingDetails(@PathVariable Long id) {
        ListingResponseDTO response = listingService.getListingById(id);
        return ResponseEntity.ok(response);
    }
    

    @GetMapping("/vendor/me")
    public ResponseEntity<List<ListingResponseDTO>> getVendorListings(@RequestHeader("X-Auth-User-Id") Long vendorId) {
        List<ListingResponseDTO> listings = listingService.getVendorListings(vendorId);
        return ResponseEntity.ok(listings);
    }
 
    @PutMapping("/{id}/rating")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateListingRating(@PathVariable Long id, @RequestBody Double newAvgRating) {
        listingService.updateListingRating(id, newAvgRating);
    }
}
package com.wedding.listingService.service.impl;

import com.wedding.listingService.config.KafkaTopicConfig;
import com.wedding.listingService.dto.ListingEvent;
import com.wedding.listingService.dto.ListingRequestDTO;
import com.wedding.listingService.dto.ListingResponseDTO;
import com.wedding.listingService.entity.Listing;
import com.wedding.listingService.enums.ListingStatus;
import com.wedding.listingService.exception.ListingNotFoundException;
import com.wedding.listingService.factory.ListingFactory;
import com.wedding.listingService.mapper.ListingMapper;
import com.wedding.listingService.repository.ListingRepository;
import com.wedding.listingService.service.ListingService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingServiceImpl implements ListingService {

    private final ListingRepository listingRepository;
    private final ListingFactory listingFactory;
    private final ListingMapper listingMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public ListingServiceImpl(ListingRepository listingRepository, ListingFactory listingFactory,
            ListingMapper listingMapper, KafkaTemplate<String, Object> kafkaTemplate) {
        this.listingRepository = listingRepository;
        this.listingFactory = listingFactory;
        this.listingMapper = listingMapper;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    @Transactional
    public void createListing(ListingRequestDTO requestDTO, Long vendorId) {
        Listing newListing = listingFactory.createListing(requestDTO);
        newListing.setVendorId(vendorId);
        newListing.setStatus(ListingStatus.PENDING); // Default status: PENDING

        listingRepository.save(newListing);
    }

    // NOTE: Update logic is complex due to inheritance; simplified for presentation
    // focus.
    @Override
    @Transactional
    public void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId) {
        Listing existingListing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with ID: " + listingId));

        if (!existingListing.getVendorId().equals(vendorId)) {
            // Throw UnauthorizedAccess or similar exception
            throw new RuntimeException("Unauthorized update attempt."); // Task 1.2: Ensure only owner can update
        }

        // Logic to delete the old subclass entity and save the new one if category
        // changed is omitted
        // here for simplicity, but the Factory is ready to create the new entity.
        // For simple updates, map fields and save.

        Listing updatedListing = listingFactory.createListing(requestDTO);
        updatedListing.setId(listingId);
        updatedListing.setVendorId(vendorId); // Keep existing ID and vendorId
        updatedListing.setStatus(existingListing.getStatus()); // Keep existing status

        listingRepository.save(updatedListing);

        // Trigger Kafka if status is PUBLISHED
        if (updatedListing.getStatus() == ListingStatus.PUBLISHED) {
            publishListingEvent(updatedListing);
        }
    }

    @Override
    @Transactional
    public void updateListingRating(Long listingId, Double newAvgRating) {
        // Task 3.2: Internal endpoint used by Review Service
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found"));

        listing.setAvgRating(newAvgRating); // Update avgRating
        listingRepository.save(listing);

        // Trigger Kafka update to sync Search Service (Task 3.2/2.2)
        if (listing.getStatus() == ListingStatus.PUBLISHED) {
            publishListingEvent(listing);
        }
    }

    // ... Implement getListingById and getVendorListings using ListingMapper ...

    // Helper method for Kafka Publishing (Task 2.2)
    private void publishListingEvent(Listing listing) {
        ListingEvent event = new ListingEvent(
                listing.getId(),
                listing.getTitle(),
                listing.getPriceMin(),
                listing.getDistrict(),
                listing.getStatus());
        kafkaTemplate.send(KafkaTopicConfig.LISTING_TOPIC, event); // Publish only if PUBLISHED
    }

    // Placeholder for other interface methods
    @Override
    public ListingResponseDTO getListingById(Long listingId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with ID: " + listingId));
        return listingMapper.toResponseDTO(listing);
    }

    @Override
    public List<ListingResponseDTO> getVendorListings(Long vendorId) {
        List<Listing> listings = listingRepository.findByVendorId(vendorId);
        return listings.stream()
                .map(listingMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
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
        newListing.setStatus(ListingStatus.PUBLISHED);

        listingRepository.save(newListing);

        publishListingEvent(newListing, "CREATE");
    }

    @Override
    @Transactional
    public void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId) {
        @SuppressWarnings("null")
        Listing existingListing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with ID: " + listingId));

        if (!existingListing.getVendorId().equals(vendorId)) {
            throw new RuntimeException("Unauthorized update attempt.");
        }

        Listing updatedListing = listingFactory.createListing(requestDTO);
        updatedListing.setId(listingId);
        updatedListing.setVendorId(vendorId);
        updatedListing.setStatus(existingListing.getStatus());

        listingRepository.save(updatedListing);

        publishListingEvent(updatedListing, "UPDATE");
    }

    @Override
    @Transactional
    public void deleteListing(Long listingId, Long vendorId) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found with ID: " + listingId));

        if (!listing.getVendorId().equals(vendorId)) {
            throw new RuntimeException("Unauthorized delete attempt. Vendor ID mismatch.");
        }

        listingRepository.delete(listing);
        System.out.println("DEBUG: Deleted listing ID: " + listingId);

        publishListingEvent(listing, "DELETE");
    }

    @Override
    @Transactional
    public void updateListingRating(Long listingId, Double newAvgRating) {
        @SuppressWarnings("null")
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found"));

        listing.setAvgRating(newAvgRating);
        listingRepository.save(listing);

        publishListingEvent(listing, "UPDATE");
    }

    private void publishListingEvent(Listing listing, String operation) {
        ListingEvent event = new ListingEvent();
        event.setId(listing.getId());
        event.setTitle(listing.getTitle());
        event.setDescription(listing.getDescription());
        event.setCategory(listing.getCategory());
        event.setPriceMin(listing.getPriceMin());
        event.setPriceMax(listing.getPriceMax());
        event.setDistrict(listing.getDistrict());
        event.setStatus(listing.getStatus() != null ? listing.getStatus().toString() : "PENDING");
        event.setAvgRating(listing.getAvgRating());
        event.setOperation(operation);

        if (listing.getImages() != null && !listing.getImages().isEmpty()) {
            event.setMainImageUrl(listing.getImages().get(0).getUrl());
        }

        System.out.println("📨 Attempting to publish Kafka event for Listing ID: " + listing.getId());
        try {
            var future = kafkaTemplate.send(KafkaTopicConfig.LISTING_TOPIC, event);
            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    System.out.println("✅ Kafka Send SUCCESS for Listing ID: " + listing.getId() +
                            " to topic: " + result.getRecordMetadata().topic() +
                            " partition: " + result.getRecordMetadata().partition() +
                            " offset: " + result.getRecordMetadata().offset());
                } else {
                    System.err
                            .println("❌ Kafka Send FAILED for Listing ID: " + listing.getId() + ": " + ex.getMessage());
                    ex.printStackTrace();
                }
            });
        } catch (Exception e) {
            System.err.println("❌ FAILED to initiate Kafka send for Listing ID: " + listing.getId());
            e.printStackTrace();
        }
    }

    @SuppressWarnings("null")
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

    @Override
    public List<ListingResponseDTO> getAllListings(String category) {
        List<Listing> listings;
        if (category != null && !category.isEmpty()) {
            try {
                System.out.println("DEBUG: getAllListings called with category: " + category);
                String normalizedCat = category.trim().toUpperCase();
                if ("SALOON".equals(normalizedCat)) {
                    normalizedCat = "SALON";
                } else if ("PHOTOGRAPHY".equals(normalizedCat)) {
                    normalizedCat = "PHOTOGRAPHER";
                } else if ("DRESSES".equals(normalizedCat)) {
                    normalizedCat = "DRESS";
                }
                com.wedding.listingService.enums.Category catEnum = com.wedding.listingService.enums.Category
                        .valueOf(normalizedCat);
                System.out.println("DEBUG: Converted to Enum: " + catEnum.name());
                try {
                    listings = listingRepository.findByCategory(catEnum.name());
                    System.out.println("DEBUG: Found " + listings.size() + " listings for category: " + catEnum.name());
                } catch (Exception e) {
                    System.err.println("ERROR_FETCHING_LISTINGS: " + e.getMessage());
                    e.printStackTrace();
                    throw e;
                }
            } catch (IllegalArgumentException e) {
                System.out.println("DEBUG: Invalid category: " + category);
                return List.of();
            }
        } else {
            System.out.println("DEBUG: fetching all listings (no category)");
            listings = listingRepository.findAll();
        }

        System.out.println("DEBUG: Raw listings found: " + listings.size());

        List<ListingResponseDTO> result = listings.stream()
                .filter(l -> {
                    boolean isPublished = l.getStatus() == ListingStatus.PUBLISHED;
                    if (!isPublished)
                        System.out.println("DEBUG: Listing " + l.getId() + " skipped (Status: " + l.getStatus() + ")");
                    return isPublished;
                })
                .map(listingMapper::toResponseDTO)
                .collect(Collectors.toList());

        System.out.println("DEBUG: Returning " + result.size() + " published listings");
        return result;
    }

    @Override
    public String uploadImage(org.springframework.web.multipart.MultipartFile file) {
        if (file.isEmpty()) {
            throw new RuntimeException("Failed to store empty file.");
        }
        try {
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path rootLocation = java.nio.file.Paths.get("uploads");
            if (!java.nio.file.Files.exists(rootLocation)) {
                java.nio.file.Files.createDirectories(rootLocation);
            }
            java.nio.file.Files.copy(file.getInputStream(), rootLocation.resolve(filename));
            return "/api/listings/uploads/" + filename;
        } catch (java.io.IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }
}
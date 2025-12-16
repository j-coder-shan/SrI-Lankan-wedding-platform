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
        newListing.setStatus(ListingStatus.PENDING); 

        listingRepository.save(newListing);
    }

  
    @Override
    @Transactional
    public void updateListing(Long listingId, ListingRequestDTO requestDTO, Long vendorId) {
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

        if (updatedListing.getStatus() == ListingStatus.PUBLISHED) {
            publishListingEvent(updatedListing);
        }
    }

    @Override
    @Transactional
    public void updateListingRating(Long listingId, Double newAvgRating) {
        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new ListingNotFoundException("Listing not found"));

        listing.setAvgRating(newAvgRating); 
        listingRepository.save(listing);

        if (listing.getStatus() == ListingStatus.PUBLISHED) {
            publishListingEvent(listing);
        }
    }

  
    private void publishListingEvent(Listing listing) {
        ListingEvent event = new ListingEvent(
                listing.getId(),
                listing.getTitle(),
                listing.getPriceMin(),
                listing.getDistrict(),
                listing.getStatus());
        kafkaTemplate.send(KafkaTopicConfig.LISTING_TOPIC, event); 
    }

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
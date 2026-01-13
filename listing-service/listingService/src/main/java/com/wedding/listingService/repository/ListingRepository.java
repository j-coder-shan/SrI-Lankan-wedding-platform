package com.wedding.listingService.repository;


import com.wedding.listingService.entity.Listing;
import com.wedding.listingService.enums.Category;
import com.wedding.listingService.enums.ListingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    List<Listing> findByVendorId(Long vendorId);

    List<Listing> findByVendorIdAndStatus(Long vendorId, ListingStatus status);

    List<Listing> findByCategory(Category category);

    List<Listing> findByStatus(ListingStatus status);

    Optional<Listing> findByIdAndVendorId(Long id, Long vendorId);

    @Query("SELECT l FROM Listing l WHERE l.status = 'PUBLISHED' ORDER BY l.avgRating DESC")
    List<Listing> findTopRatedListings();
}


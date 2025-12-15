package com.booking.enquiryservice.repository;

import com.booking.enquiryservice.entity.Enquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    // For Task 1.3 views
    Page<Enquiry> findByVendorId(Long vendorId, Pageable pageable);
    List<Enquiry> findByCoupleId(Long coupleId);
}

package com.booking.enquiryservice.repository;

import com.booking.enquiryservice.entity.EnquiryHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnquiryHistoryRepository extends JpaRepository<EnquiryHistory, Long> {
}

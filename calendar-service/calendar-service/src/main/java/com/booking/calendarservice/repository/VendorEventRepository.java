package com.booking.calendarservice.repository;

import com.booking.calendarservice.Entity.VendorEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface VendorEventRepository extends JpaRepository<VendorEvent, Long> {
    List<VendorEvent> findByVendorIdAndDate(Long vendorId, LocalDate date);
}
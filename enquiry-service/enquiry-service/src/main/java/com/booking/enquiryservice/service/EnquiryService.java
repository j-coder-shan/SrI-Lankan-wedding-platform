package com.booking.enquiryservice.service;

import com.booking.enquiryservice.client.CalenderClient;
import com.booking.enquiryservice.repository.EnquiryHistoryRepository;
import com.booking.enquiryservice.entity.Enquiry;
import com.booking.enquiryservice.entity.EnquiryHistory;
import com.booking.enquiryservice.entity.EnquiryStatus;
import com.booking.enquiryservice.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EnquiryService {

    private final EnquiryRepository repository;
    private final EnquiryHistoryRepository historyRepository;
    private final CalenderClient calendarClient;

    // 1. Create Lead
    public Enquiry createEnquiry(Enquiry enquiry) {
        // Validation
        if (enquiry == null) {
            throw new IllegalArgumentException("Enquiry payload is required");
        }
        if (enquiry.getVendorId() == null) {
            throw new IllegalArgumentException("vendorId is required");
        }
        if (enquiry.getCoupleId() == null) {
            throw new IllegalArgumentException("coupleId is required");
        }
        if (enquiry.getEventDate() == null) {
            throw new IllegalArgumentException("eventDate is required");
        }
        if (enquiry.getEventDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Date must be in the future");
        }

        // Logic: Call Calendar Service (Bypassed for Direct Booking Flow)
        /*
         * boolean isAvailable;
         * try {
         * isAvailable = calendarClient.checkAvailability(
         * enquiry.getVendorId(),
         * enquiry.getEventDate().toString(),
         * "FULL_DAY" // Defaulting to full day for weddings
         * );
         * } catch (Exception ex) {
         * // If calendar-service is down or unreachable, surface a clear 503-style
         * error
         * throw new IllegalStateException("Calendar service is unavailable: " +
         * ex.getMessage());
         * }
         * 
         * if (!isAvailable) {
         * throw new IllegalStateException("Vendor is not available on this date");
         * }
         */

        enquiry.setStatus(EnquiryStatus.PENDING);
        return repository.save(enquiry);
    }

    // 2. Status Update (With Audit)
    @Transactional
    public Enquiry updateStatus(Long id, EnquiryStatus newStatus, Long vendorId) {
        if (vendorId == null) {
            throw new IllegalArgumentException("X-User-Id header (vendorId) is required");
        }
        if (newStatus == null) {
            throw new IllegalArgumentException("status is required");
        }
        @SuppressWarnings("null")
        Enquiry enquiry = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found"));

        // Security Check
        if (enquiry.getVendorId() == null || !enquiry.getVendorId().equals(vendorId)) {
            throw new SecurityException("You do not own this enquiry");
        }

        // Capture old status for history
        EnquiryStatus oldStatus = enquiry.getStatus();

        // Update
        enquiry.setStatus(newStatus);
        Enquiry saved = repository.save(enquiry); // @Version check happens here automatically

        // Audit
        EnquiryHistory history = new EnquiryHistory(saved, oldStatus, newStatus, "VENDOR_" + vendorId);
        historyRepository.save(history);

        return saved;
    }
}
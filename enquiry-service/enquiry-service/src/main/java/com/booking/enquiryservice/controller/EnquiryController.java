package com.booking.enquiryservice.controller;

import com.booking.enquiryservice.entity.Enquiry;
import com.booking.enquiryservice.entity.EnquiryStatus;
import com.booking.enquiryservice.repository.EnquiryRepository;
import com.booking.enquiryservice.service.EnquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
public class EnquiryController {

    private final EnquiryService service;
    private final EnquiryRepository repository; // Direct access for simple GETs is okay

    // 1. Create Lead
    @PostMapping
    public Enquiry createEnquiry(@RequestBody Enquiry enquiry) {
        return service.createEnquiry(enquiry);
    }

    // 2. Status Update
    @PatchMapping("/{id}/status")
    public Enquiry updateStatus(@PathVariable Long id,
                                @RequestParam EnquiryStatus status,
                                @RequestHeader("X-User-Id") Long vendorId) { // Simulating ID from Token
        return service.updateStatus(id, status, vendorId);
    }

    // 3. Vendor View (Task 1.3)
    @GetMapping("/vendor/me")
    public Page<Enquiry> getVendorEnquiries(@RequestHeader("X-User-Id") Long vendorId,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "10") int size) {
        return repository.findByVendorId(vendorId, PageRequest.of(page, size));
    }

    // 4. Couple View (Task 1.3)
    @GetMapping("/couple/me")
    public List<Enquiry> getCoupleEnquiries(@RequestHeader("X-User-Id") Long coupleId) {
        return repository.findByCoupleId(coupleId);
    }
}

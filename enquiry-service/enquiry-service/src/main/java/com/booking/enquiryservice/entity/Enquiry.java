package com.booking.enquiryservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
public class Enquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relationships (Logical)
    private Long listingId;
    private Long vendorId;
    private Long coupleId;

    private LocalDate eventDate;
    private Integer guestCount;

    @Enumerated(EnumType.STRING)
    private EnquiryStatus status;

    private BigDecimal finalPrice;

    // --- Snapshots (Avoid N+1 calls) ---
    private String coupleNameSnapshot;
    private String couplePhoneSnapshot;
    private String listingTitleSnapshot;

    // --- Optimistic Locking ---
    @Version
    private Integer version;
}
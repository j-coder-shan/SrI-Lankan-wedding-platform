package com.booking.enquiryservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class EnquiryHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "enquiry_id")
    private Enquiry enquiry;

    @Enumerated(EnumType.STRING)
    private EnquiryStatus statusFrom;

    @Enumerated(EnumType.STRING)
    private EnquiryStatus statusTo;

    private LocalDateTime timestamp;
    private String changedBy; // User ID

    public EnquiryHistory(Enquiry enquiry, EnquiryStatus from, EnquiryStatus to, String changedBy) {
        this.enquiry = enquiry;
        this.statusFrom = from;
        this.statusTo = to;
        this.changedBy = changedBy;
        this.timestamp = LocalDateTime.now();
    }
}

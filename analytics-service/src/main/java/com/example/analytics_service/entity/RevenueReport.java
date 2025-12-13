package com.example.analytics_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "revenue_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Source Data
    private Long invoiceId;
    private Long vendorId;

    // Dimensions for Reporting (These help us filter graphs)
    private String vendorCategory; // VENUE, SALON, etc.
    private String district; // Colombo, Kandy (Enriched Data)

    // Metrics
    private BigDecimal amountEarned; // The platform commission

    // Time Dimensions
    private LocalDate transactionDate; // For "Daily Revenue" charts
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (transactionDate == null) {
            transactionDate = LocalDate.now();
        }
    }
}
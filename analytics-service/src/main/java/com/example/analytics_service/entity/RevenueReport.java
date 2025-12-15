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

    // Manual builder for Maven compilation
    public static RevenueReportBuilder builder() {
        return new RevenueReportBuilder();
    }

    public static class RevenueReportBuilder {
        private Long invoiceId;
        private Long vendorId;
        private String vendorCategory;
        private String district;
        private BigDecimal amountEarned;
        private LocalDate transactionDate;

        public RevenueReportBuilder invoiceId(Long invoiceId) {
            this.invoiceId = invoiceId;
            return this;
        }

        public RevenueReportBuilder vendorId(Long vendorId) {
            this.vendorId = vendorId;
            return this;
        }

        public RevenueReportBuilder vendorCategory(String vendorCategory) {
            this.vendorCategory = vendorCategory;
            return this;
        }

        public RevenueReportBuilder district(String district) {
            this.district = district;
            return this;
        }

        public RevenueReportBuilder amountEarned(BigDecimal amountEarned) {
            this.amountEarned = amountEarned;
            return this;
        }

        public RevenueReportBuilder transactionDate(LocalDate transactionDate) {
            this.transactionDate = transactionDate;
            return this;
        }

        public RevenueReport build() {
            RevenueReport report = new RevenueReport();
            report.invoiceId = this.invoiceId;
            report.vendorId = this.vendorId;
            report.vendorCategory = this.vendorCategory;
            report.district = this.district;
            report.amountEarned = this.amountEarned;
            report.transactionDate = this.transactionDate;
            return report;
        }
    }
}

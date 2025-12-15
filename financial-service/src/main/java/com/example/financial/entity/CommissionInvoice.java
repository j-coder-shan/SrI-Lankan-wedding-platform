package com.example.financial.entity;

import com.example.financial.enums.InvoiceStatus;
import com.example.financial.enums.ListingStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "commission_invoices", indexes = @Index(name = "idx_enquiry", columnList = "enquiry_id", unique = true))
public class CommissionInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "enquiry_id", nullable = false, unique = true)
    public Long enquiryId;

    @Column(name = "vendor_id", nullable = false)
    public Long vendorId;

    @Column(name = "listing_id", nullable = false)
    public Long listingId;

    @Enumerated(EnumType.STRING)
    @Column(name = "category", nullable = false)
    public ListingStatus category;

    @Column(name = "booking_value", nullable = false, precision = 12, scale = 2)
    public BigDecimal bookingValue;

    @Column(name = "commission_rate", nullable = false, precision = 5, scale = 4)
    public BigDecimal commissionRate;

    @Column(name = "amount_due", nullable = false, precision = 12, scale = 2)
    public BigDecimal amountDue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    public InvoiceStatus status;

    @Column(name = "due_date")
    public LocalDate dueDate;

    @Column(updatable = false)
    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null)
            status = InvoiceStatus.DUE;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
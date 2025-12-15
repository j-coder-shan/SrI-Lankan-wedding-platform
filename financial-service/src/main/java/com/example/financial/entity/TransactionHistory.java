package com.example.financial.entity;

import com.example.financial.enums.PaymentMethod;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_history")
public class TransactionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    public CommissionInvoice invoice;

    @Column(nullable = false, precision = 12, scale = 2)
    public BigDecimal amount;

    @Enumerated(EnumType.STRING)
    public PaymentMethod method;

    @Column(name = "reference_no")
    public String referenceNo;

    public LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}

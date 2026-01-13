package com.example.analytics_service.service;

import com.example.analytics_service.dto.InvoicePaidEvent;
import com.example.analytics_service.entity.RevenueReport;
import com.example.analytics_service.repository.RevenueRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class AnalyticsConsumer {

    private static final Logger log = LoggerFactory.getLogger(AnalyticsConsumer.class);
    private final RevenueRepository revenueRepository;

    // Explicit constructor for dependency injection
    public AnalyticsConsumer(RevenueRepository revenueRepository) {
        this.revenueRepository = revenueRepository;
    }

    @KafkaListener(topics = "invoice-paid-events", groupId = "analytics-group")
    public void handleInvoicePaid(InvoicePaidEvent event) {
        log.info("Received Payment Event for Invoice: {}", event.getInvoiceId());

        // 1. Map Event to Reporting Entity
        RevenueReport report = RevenueReport.builder()
                .invoiceId(event.getInvoiceId())
                .vendorId(event.getVendorId())
                .amountEarned(event.getAmountPaid()) // In a real app, calculate commission split here
                .transactionDate(LocalDate.now())
                // NOTE: We don't have 'district' or 'category' yet.
                // That requires Task 3.3 (Data Enrichment via Feign).
                .vendorCategory("UNKNOWN")
                .district("UNKNOWN")
                .build();

        // 2. Save to Data Warehouse (PostgreSQL)
        revenueRepository.save(report);

        log.info("Revenue Report saved for Vendor: {}", event.getVendorId());
    }
}

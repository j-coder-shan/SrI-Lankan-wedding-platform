package com.example.financial.service;

import com.example.financial.dto.InvoiceDTOs.InvoiceCreationRequest;
import com.example.financial.dto.InvoicePaidEvent;
import com.example.financial.entity.CommissionInvoice;
import com.example.financial.entity.TransactionHistory;
import com.example.financial.enums.InvoiceStatus;
import com.example.financial.enums.PaymentMethod;
import com.example.financial.repository.InvoiceRepository;
import com.example.financial.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class FinancialService {

    private final InvoiceRepository invoiceRepository;
    private final TransactionRepository transactionRepository;
    private final CommissionStrategy commissionStrategy;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public CommissionInvoice createInvoice(InvoiceCreationRequest request) {

        if (invoiceRepository.existsByEnquiryId(request.getEnquiryId())) {
            log.info("Invoice already exists for Enquiry ID: {}", request.getEnquiryId());
            return invoiceRepository.findByEnquiryId(request.getEnquiryId()).orElseThrow();
        }

        BigDecimal rate = commissionStrategy.getCommissionRate(request.getCategory());
        BigDecimal amountDue = request.getFinalPrice().multiply(rate);

        CommissionInvoice invoice = CommissionInvoice.builder()
                .enquiryId(request.getEnquiryId())
                .vendorId(request.getVendorId())
                .listingId(request.getListingId())
                .category(request.getCategory())
                .bookingValue(request.getFinalPrice())
                .commissionRate(rate)
                .amountDue(amountDue)
                .status(InvoiceStatus.DUE)
                .dueDate(LocalDate.now().plusDays(7))
                .build();

        CommissionInvoice savedInvoice = invoiceRepository.save(invoice);
        log.info("Generated Invoice #{} for Enquiry {}. Amount: {}",
                savedInvoice.getId(), request.getEnquiryId(), amountDue);
        return savedInvoice;
    }

    @Transactional
    public CommissionInvoice processPayment(Long invoiceId, PaymentMethod method, String referenceNo) {
        CommissionInvoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceId));

        if (invoice.getStatus() == InvoiceStatus.PAID) {
            throw new RuntimeException("Invoice " + invoiceId + " is already PAID.");
        }

        invoice.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice);

        TransactionHistory history = TransactionHistory.builder()
                .invoice(invoice)
                .amount(invoice.getAmountDue())
                .method(method)
                .referenceNo(referenceNo)
                .timestamp(LocalDateTime.now())
                .build();
        transactionRepository.save(history);

        InvoicePaidEvent event = InvoicePaidEvent.builder()
                .invoiceId(invoice.getId())
                .vendorId(invoice.getVendorId())
                .amountPaid(invoice.getAmountDue())
                .paidAt(LocalDateTime.now())
                .build();

        kafkaTemplate.send("invoice-paid-events", event);
        log.info("Payment processed for Invoice #{}", invoiceId);

        return invoice;
    }

    @Transactional
    public void voidInvoice(Long enquiryId) {
        CommissionInvoice invoice = invoiceRepository.findByEnquiryId(enquiryId)
                .orElseThrow(() -> new RuntimeException("No invoice found for Enquiry: " + enquiryId));

        if (invoice.getStatus() == InvoiceStatus.PAID) {
            invoice.setStatus(InvoiceStatus.REFUNDED);
            log.warn("Invoice #{} marked for REFUND due to booking cancellation", invoice.getId());
        } else {

            invoice.setStatus(InvoiceStatus.VOIDED);
            log.info("Invoice #{} VOIDED due to booking cancellation", invoice.getId());
        }
        invoiceRepository.save(invoice);
    }
}
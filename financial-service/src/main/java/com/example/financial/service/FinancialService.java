package com.example.financial.service;

import com.example.financial.dto.InvoiceDTOs.InvoiceCreationRequest;
import com.example.financial.dto.InvoicePaidEvent;
import com.example.financial.entity.CommissionInvoice;
import com.example.financial.entity.TransactionHistory;
import com.example.financial.enums.InvoiceStatus;
import com.example.financial.enums.PaymentMethod;
import com.example.financial.repository.InvoiceRepository;
import com.example.financial.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class FinancialService {

    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CommissionStrategy commissionStrategy;
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Transactional
    public CommissionInvoice createInvoice(InvoiceCreationRequest request) {

        if (invoiceRepository.existsByEnquiryId(request.enquiryId)) {
            System.out.println("Invoice already exists for Enquiry ID: " + request.enquiryId);
            return invoiceRepository.findByEnquiryId(request.enquiryId).orElseThrow();
        }

        BigDecimal rate = commissionStrategy.getCommissionRate(request.category);
        BigDecimal amountDue = request.finalPrice.multiply(rate);

        CommissionInvoice invoice = new CommissionInvoice();
        invoice.enquiryId = request.enquiryId;
        invoice.vendorId = request.vendorId;
        invoice.listingId = request.listingId;
        invoice.category = request.category;
        invoice.bookingValue = request.finalPrice;
        invoice.commissionRate = rate;
        invoice.amountDue = amountDue;
        invoice.status = InvoiceStatus.DUE;
        invoice.dueDate = LocalDate.now().plusDays(7);

        CommissionInvoice savedInvoice = invoiceRepository.save(invoice);
        System.out.println("Generated Invoice #" + savedInvoice.id + " for Enquiry " + request.enquiryId + ". Amount: " + amountDue);
        return savedInvoice;
    }

    @Transactional
    public CommissionInvoice processPayment(Long invoiceId, PaymentMethod method, String referenceNo) {
        CommissionInvoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found: " + invoiceId));

        if (invoice.status == InvoiceStatus.PAID) {
            throw new RuntimeException("Invoice " + invoiceId + " is already PAID.");
        }

        invoice.status = InvoiceStatus.PAID;
        invoiceRepository.save(invoice);

        TransactionHistory history = new TransactionHistory();
        history.invoice = invoice;
        history.amount = invoice.amountDue;
        history.method = method;
        history.referenceNo = referenceNo;
        history.timestamp = LocalDateTime.now();
        transactionRepository.save(history);

        InvoicePaidEvent event = new InvoicePaidEvent();
        event.invoiceId = invoice.id;
        event.vendorId = invoice.vendorId;
        event.amountPaid = invoice.amountDue;
        event.paidAt = LocalDateTime.now();

        kafkaTemplate.send("invoice-paid-events", event);
        System.out.println("Payment processed for Invoice #" + invoiceId);

        return invoice;
    }

    @Transactional
    public void voidInvoice(Long enquiryId) {
        CommissionInvoice invoice = invoiceRepository.findByEnquiryId(enquiryId)
                .orElseThrow(() -> new RuntimeException("No invoice found for Enquiry: " + enquiryId));

        if (invoice.status == InvoiceStatus.PAID) {
            invoice.status = InvoiceStatus.REFUNDED;
            System.out.println("Invoice #" + invoice.id + " marked for REFUND due to booking cancellation");
        } else {
            invoice.status = InvoiceStatus.VOIDED;
            System.out.println("Invoice #" + invoice.id + " VOIDED due to booking cancellation");
        }
        invoiceRepository.save(invoice);
    }
}
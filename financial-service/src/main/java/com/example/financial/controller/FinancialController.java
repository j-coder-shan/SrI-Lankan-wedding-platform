package com.example.financial.controller;

import com.example.financial.dto.InvoiceDTOs.InvoiceCreationRequest;
import com.example.financial.dto.InvoiceDTOs.PaymentRequest;
import com.example.financial.entity.CommissionInvoice;
import com.example.financial.enums.InvoiceStatus;
import com.example.financial.repository.InvoiceRepository;
import com.example.financial.service.FinancialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financial")
public class FinancialController {

    @Autowired
    private FinancialService financialService;
    @Autowired
    private InvoiceRepository invoiceRepository;

    @PostMapping("/invoices")
    public ResponseEntity<CommissionInvoice> createInvoice(@Valid @RequestBody InvoiceCreationRequest request) {
        CommissionInvoice invoice = financialService.createInvoice(request);
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/invoices/vendor/me")
    public ResponseEntity<List<CommissionInvoice>> getMyInvoices(
            @RequestHeader(value = "X-Auth-User-Id", required = false) Long vendorId,
            @RequestParam(required = false) InvoiceStatus status) {

        if (vendorId == null)
            throw new RuntimeException("User ID header missing");

        List<CommissionInvoice> invoices;
        if (status != null) {
            invoices = invoiceRepository.findByVendorIdAndStatus(vendorId, status);
        } else {
            invoices = invoiceRepository.findByVendorId(vendorId);
        }
        return ResponseEntity.ok(invoices);
    }

    @PostMapping("/invoices/{id}/pay")
    public ResponseEntity<CommissionInvoice> payInvoice(
            @PathVariable Long id,
            @Valid @RequestBody PaymentRequest request) {
        CommissionInvoice updatedInvoice = financialService.processPayment(id, request.method,
                request.referenceNo);
        return ResponseEntity.ok(updatedInvoice);
    }

    @PatchMapping("/invoices/void")
    public ResponseEntity<Void> voidInvoice(@RequestParam Long enquiryId) {
        financialService.voidInvoice(enquiryId);
        return ResponseEntity.ok().build();
    }
}
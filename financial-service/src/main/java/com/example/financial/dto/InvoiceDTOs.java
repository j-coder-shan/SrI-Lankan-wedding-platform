package com.example.financial.dto;

import com.example.financial.enums.PaymentMethod;
import com.example.financial.enums.ListingStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

public class InvoiceDTOs {

    @Data
    public static class InvoiceCreationRequest {
        @NotNull(message = "Enquiry ID is required")
        private Long enquiryId;

        @NotNull(message = "Vendor ID is required")
        private Long vendorId;

        @NotNull(message = "Listing ID is required")
        private Long listingId;

        @NotNull(message = "Category is required")
        private ListingStatus category;

        @NotNull
        @Positive(message = "Price must be positive")
        private BigDecimal finalPrice;
    }

    @Data
    public static class PaymentRequest {
        @NotNull(message = "Payment Method is required")
        private PaymentMethod method;

        private String referenceNo;
    }
}
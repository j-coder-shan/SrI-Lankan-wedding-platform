package com.example.financial.dto;

import com.example.financial.enums.PaymentMethod;
import com.example.financial.enums.ListingStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class InvoiceDTOs {

    public static class InvoiceCreationRequest {
        @NotNull(message = "Enquiry ID is required")
        public Long enquiryId;

        @NotNull(message = "Vendor ID is required")
        public Long vendorId;

        @NotNull(message = "Listing ID is required")
        public Long listingId;

        @NotNull(message = "Category is required")
        public ListingStatus category;

        @NotNull
        @Positive(message = "Price must be positive")
        public BigDecimal finalPrice;
    }

    public static class PaymentRequest {
        @NotNull(message = "Payment Method is required")
        public PaymentMethod method;

        public String referenceNo;
    }
}
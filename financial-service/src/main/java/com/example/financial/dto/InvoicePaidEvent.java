package com.example.financial.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class InvoicePaidEvent {
    public Long invoiceId;
    public Long vendorId;
    public BigDecimal amountPaid;
    public LocalDateTime paidAt;
}
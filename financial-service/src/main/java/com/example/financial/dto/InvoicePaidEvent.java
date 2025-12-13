package com.example.financial.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoicePaidEvent {
    private Long invoiceId;
    private Long vendorId;
    private BigDecimal amountPaid;
    private LocalDateTime paidAt;
}
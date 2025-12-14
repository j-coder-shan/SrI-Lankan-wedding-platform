package com.example.financial.service;

import com.example.financial.enums.ListingStatus;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class CommissionStrategy {

    private static final BigDecimal RATE_VENUE = new BigDecimal("0.10");
    private static final BigDecimal RATE_PHOTOGRAPHY = new BigDecimal("0.12");
    private static final BigDecimal RATE_DEFAULT = new BigDecimal("0.08");

    public BigDecimal getCommissionRate(ListingStatus category) {
        if (category == null)
            return new BigDecimal("0.05");

        return switch (category) {
            case VENUE -> RATE_VENUE;
            case PHOTOGRAPHY -> RATE_PHOTOGRAPHY;
            case DRESS, SALON, DECOR -> RATE_DEFAULT;
        };
    }
}
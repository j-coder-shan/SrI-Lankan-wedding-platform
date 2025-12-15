package com.example.analytics_service.controller;

import com.example.analytics_service.service.ReportingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final ReportingService reportingService;

    // Explicit constructor for dependency injection
    public AnalyticsController(ReportingService reportingService) {
        this.reportingService = reportingService;
    }

    /**
     * VENDOR ENDPOINT
     * GET /api/analytics/vendor/performance
     * Used for the Vendor Dashboard Charts
     */
    @GetMapping("/vendor/performance")
    public ResponseEntity<Map<String, Object>> getVendorStats(
            @RequestHeader("X-Auth-User-Id") Long vendorId) {

        // Security check (Gateway usually handles this, but good to have)
        if (vendorId == null)
            throw new RuntimeException("Unauthorized");

        return ResponseEntity.ok(reportingService.getVendorPerformance(vendorId));
    }

    /**
     * ADMIN ENDPOINT
     * GET /api/analytics/admin/revenue
     * Used for the Platform Admin Overview
     */
    @GetMapping("/admin/revenue")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        // In real app, check if user has ROLE_ADMIN via header
        return ResponseEntity.ok(reportingService.getAdminDashboard());
    }
}

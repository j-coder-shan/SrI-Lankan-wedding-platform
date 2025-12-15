package com.example.analytics_service.service;

import com.example.analytics_service.repository.ActivityRepository;
import com.example.analytics_service.repository.RevenueRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportingService {

    private final RevenueRepository revenueRepository;
    private final ActivityRepository activityRepository;

    // Explicit constructor for dependency injection
    public ReportingService(RevenueRepository revenueRepository, ActivityRepository activityRepository) {
        this.revenueRepository = revenueRepository;
        this.activityRepository = activityRepository;
    }

    // --- Vendor Logic ---
    public Map<String, Object> getVendorPerformance(Long vendorId) {
        Map<String, Object> stats = new HashMap<>();

        // 1. Financials
        BigDecimal totalEarnings = revenueRepository.getTotalEarningsForVendor(vendorId);
        stats.put("totalEarnings", totalEarnings);

        // 2. Engagement (Mocking booking count for now as we track View -> Book)
        long views = activityRepository.countByVendorIdAndActionType(vendorId, "VIEW_LISTING");
        stats.put("profileViews", views);

        return stats;
    }

    // --- Admin Logic ---
    public Map<String, Object> getAdminDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        // 1. Total Platform Money
        dashboard.put("totalRevenue", revenueRepository.getTotalPlatformRevenue());

        // 2. Geography Chart Data
        List<Object[]> byDistrict = revenueRepository.getRevenueByDistrict();
        dashboard.put("revenueByDistrict", byDistrict);

        return dashboard;
    }
}

package com.example.analytics_service.repository;

import com.example.analytics_service.entity.RevenueReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RevenueRepository extends JpaRepository<RevenueReport, Long> {

    @Query("SELECT SUM(r.amountEarned) FROM RevenueReport r WHERE r.vendorId = :vendorId")
    BigDecimal getTotalEarningsForVendor(Long vendorId);

    @Query("SELECT SUM(r.amountEarned) FROM RevenueReport r")
    BigDecimal getTotalPlatformRevenue();

    @Query("SELECT r.district, SUM(r.amountEarned) FROM RevenueReport r GROUP BY r.district")
    List<Object[]> getRevenueByDistrict();
}

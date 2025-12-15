package com.example.analytics_service.repository;

import com.example.analytics_service.entity.ActivityFunnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<ActivityFunnel, Long> {
    long countByVendorIdAndActionType(Long vendorId, String actionType);
}

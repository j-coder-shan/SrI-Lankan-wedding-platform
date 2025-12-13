package com.example.analytics_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity_funnel")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityFunnel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long vendorId;
    private Long userId;

    private String actionType;

    private LocalDateTime timestamp;

    private String userAgeGroup;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
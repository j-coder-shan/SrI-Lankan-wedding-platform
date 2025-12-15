package com.example.analytics_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String actionType; // VIEW_LISTING, SEND_ENQUIRY, BOOK, etc.

    private LocalDateTime recordedAt;

    @PrePersist
    protected void onCreate() {
        recordedAt = LocalDateTime.now();
    }
}

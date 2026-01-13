package com.booking.notificationservice.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "notification_logs")
public class NotificationLog {
    @Id
    private String id; // MongoDB uses String IDs by default

    private Long userId;
    private String type; // e.g., "BOOKING_CONFIRMED"
    private String message;

    private String status; // PENDING, SENT, FAILED
    private int retryCount;

    private LocalDateTime createdAt;
}
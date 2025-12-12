package com.booking.notificationservice.repository;

import com.booking.notificationservice.entity.NotificationLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationLogRepository extends MongoRepository<NotificationLog, String> {
    // Find all emails waiting to be sent
    List<NotificationLog> findByStatus(String status);
}
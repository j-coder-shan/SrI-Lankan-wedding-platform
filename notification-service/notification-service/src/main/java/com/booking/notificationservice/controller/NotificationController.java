package com.booking.notificationservice.controller;

import com.booking.notificationservice.entity.NotificationLog;
import com.booking.notificationservice.repository.NotificationLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/notify")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationLogRepository repository;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody NotificationLog request) {
        // Initialize default state
        request.setStatus("PENDING");
        request.setRetryCount(0);
        request.setCreatedAt(LocalDateTime.now());

        // Fast write to MongoDB
        repository.save(request);

        // Return immediately without waiting for email to send
        return ResponseEntity.accepted().body("Notification queued successfully");
    }
}
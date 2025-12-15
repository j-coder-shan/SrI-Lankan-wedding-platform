package com.booking.notificationservice.service;

import com.booking.notificationservice.client.AuthClient;
import com.booking.notificationservice.dto.UserContactDTO;
import com.booking.notificationservice.entity.NotificationLog;
import com.booking.notificationservice.repository.NotificationLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling // Required to run @Scheduled tasks
@RequiredArgsConstructor
@Slf4j
public class NotificationScheduler {

    private final NotificationLogRepository repository;
    private final AuthClient authClient;
    private final JavaMailSender mailSender;

    @Scheduled(fixedDelay = 60000) // Runs 60 seconds after the last run finishes
    public void processPendingNotifications() {
        List<NotificationLog> pendingLogs = repository.findByStatus("PENDING");

        for (NotificationLog notificationLog : pendingLogs) {
            try {
                // 1. Fetch Contact Details
                UserContactDTO contact = authClient.getContactDetails(notificationLog.getUserId());

                if (contact == null || contact.getEmail() == null) {
                    // Auth service might be down or user not found. Increment retry and skip.
                    handleRetry(notificationLog, "Contact info unavailable");
                    continue;
                }

                // 2. Send Email
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(contact.getEmail());
                message.setSubject("New Notification: " + notificationLog.getType());
                message.setText(notificationLog.getMessage());
                mailSender.send(message);

                // 3. Update Status on Success
                notificationLog.setStatus("SENT");
                repository.save(notificationLog);
                log.info("Email sent to user: {}", notificationLog.getUserId());

            } catch (Exception e) {
                handleRetry(notificationLog, e.getMessage());
            }
        }
    }

    private void handleRetry(NotificationLog notificationLog, String errorMsg) {
        notificationLog.setRetryCount(notificationLog.getRetryCount() + 1);
        if (notificationLog.getRetryCount() >= 5) {
            notificationLog.setStatus("FAILED");
        }
        repository.save(notificationLog);
        log.error("Failed to send notification (Attempt {}): {}", notificationLog.getRetryCount(), errorMsg);
    }
}

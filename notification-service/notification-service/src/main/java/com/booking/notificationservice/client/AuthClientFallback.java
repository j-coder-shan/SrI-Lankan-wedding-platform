package com.booking.notificationservice.client;

import com.booking.notificationservice.dto.UserContactDTO;
import org.springframework.stereotype.Component;

@Component
public class AuthClientFallback implements AuthClient {
    @Override
    public UserContactDTO getContactDetails(Long userId) {
        // Return null to indicate failure, allowing the scheduler to retry later
        return null;
    }
}
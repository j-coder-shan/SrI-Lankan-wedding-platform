package com.booking.notificationservice.client;

import com.booking.notificationservice.dto.UserContactDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "auth-service", fallback = AuthClientFallback.class)
public interface AuthClient {
    @GetMapping("/api/users/{id}/contact")
    UserContactDTO getContactDetails(@PathVariable("id") Long userId);
}
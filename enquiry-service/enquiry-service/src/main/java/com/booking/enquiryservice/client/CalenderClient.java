package com.booking.enquiryservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "calendar-service")
public interface CalenderClient {
    @GetMapping("/api/calendar/check")
    boolean checkAvailability(@RequestParam("vendorId") Long vendorId,
                              @RequestParam("date") String date,
                              @RequestParam("slot") String slot);
}

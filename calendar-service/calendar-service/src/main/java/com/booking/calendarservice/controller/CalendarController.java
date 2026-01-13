package com.booking.calendarservice.controller;

import com.booking.calendarservice.Entity.VendorEvent;
import com.booking.calendarservice.enums.EventType;
import com.booking.calendarservice.enums.TimeSlot;
import com.booking.calendarservice.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService service;

    // 1. Check Availability (Used by Frontend & Enquiry Service)
    @GetMapping("/check")
    public boolean checkAvailability(@RequestParam Long vendorId,
                                     @RequestParam LocalDate date,
                                     @RequestParam TimeSlot slot) {
        return service.checkAvailability(vendorId, date, slot);
    }

    // 2. Register Booking (Internal Only - Called by Enquiry Service)
    @PostMapping("/register-booking")
    public VendorEvent registerBooking(@RequestBody VendorEvent event) {
        event.setType(EventType.BOOKING);
        return service.registerBooking(event);
    }

    // 3. Vendor Block (Vendor marks a holiday)
    @PostMapping("/block")
    public VendorEvent blockDate(@RequestBody VendorEvent event) {
        event.setType(EventType.BLOCK); // Force type to BLOCK
        return service.registerBooking(event);
    }
}

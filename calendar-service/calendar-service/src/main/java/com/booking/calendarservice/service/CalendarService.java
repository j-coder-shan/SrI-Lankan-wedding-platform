package com.booking.calendarservice.service;

import com.booking.calendarservice.Entity.VendorEvent;
import com.booking.calendarservice.enums.TimeSlot;
import com.booking.calendarservice.exception.DateAlreadyBookedException;
import com.booking.calendarservice.repository.VendorEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final VendorEventRepository repository;

    // Task 2.2: Check Logic
    public boolean checkAvailability(Long vendorId, LocalDate date, TimeSlot requestedSlot) {
        List<VendorEvent> events = repository.findByVendorIdAndDate(vendorId, date);

        // 1. If requesting FULL_DAY -> Fail if ANY event exists (even a single slot)
        if (requestedSlot == TimeSlot.FULL_DAY) {
            return events.isEmpty();
        }

        // 2. Check if a FULL_DAY block already exists (blocks everything)
        boolean hasFullDay = events.stream()
                .anyMatch(e -> e.getTimeSlot() == TimeSlot.FULL_DAY);
        if (hasFullDay)
            return false;

        // 3. Check specific slot conflicts
        if (requestedSlot == TimeSlot.MORNING) {
            return events.stream().noneMatch(e -> e.getTimeSlot() == TimeSlot.MORNING);
        }

        if (requestedSlot == TimeSlot.EVENING) {
            return events.stream().noneMatch(e -> e.getTimeSlot() == TimeSlot.EVENING);
        }

        return true;
    }

    // Task 2.3: Booking Logic
    @SuppressWarnings("null")
    public VendorEvent registerBooking(VendorEvent event) {
        try {
            // Optional: Run checkAvailability here first for a faster user feedback loop
            return repository.save(event);
        } catch (DataIntegrityViolationException e) {
            // This catches the Postgres Unique Constraint violation
            throw new DateAlreadyBookedException("This slot is already taken.");
        }
    }
}

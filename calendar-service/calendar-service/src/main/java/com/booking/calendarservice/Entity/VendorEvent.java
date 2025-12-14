package com.booking.calendarservice.Entity;


import com.booking.calendarservice.enums.EventType;
import com.booking.calendarservice.enums.TimeSlot;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "vendor_events",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"vendorId", "date", "timeSlot"})
        })
public class VendorEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long vendorId;

    private Long enquiryId; // Nullable (Manual blocks won't have an enquiry)

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TimeSlot timeSlot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType type;
}
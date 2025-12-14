package com.wedding.reviewService.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long listingId; // Task 3.1
    private Long userId; // Task 3.1 (ID of the reviewing user)
    private Integer rating; // Task 3.1 (1-5)

    @Column(columnDefinition = "TEXT")
    private String comment; // Task 3.1

    private LocalDateTime createdAt; // Task 3.1

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

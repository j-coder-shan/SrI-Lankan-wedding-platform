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

    private Long listingId; 
    private Long userId; 
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private LocalDateTime createdAt; 

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

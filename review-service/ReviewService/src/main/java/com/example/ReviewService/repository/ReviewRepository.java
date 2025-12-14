package com.example.ReviewService.repository;

import com.example.ReviewService.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Task 3.2: Run SQL query: SELECT AVG(rating) FROM review WHERE listing_id = ?
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listingId = :listingId")
    Double calculateAverageRating(Long listingId);
}
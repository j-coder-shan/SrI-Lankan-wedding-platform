package com.wedding.reviewService.repository;

import com.wedding.reviewService.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.listingId = :listingId")
    Double calculateAverageRating(Long listingId);
}

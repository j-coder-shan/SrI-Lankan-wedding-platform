package com.wedding.listingService.entity.details;

import com.wedding.listingService.entity.Listing;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "salon_details")
@PrimaryKeyJoinColumn(name = "listing_id")
@Data
@EqualsAndHashCode(callSuper = true)
public class SalonDetails extends Listing {
    private String gender; // (BRIDAL, GROOM, UNISEX)
    private String services; // Stored as a string for simplicity
}

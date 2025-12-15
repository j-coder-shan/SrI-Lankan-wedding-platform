package com.wedding.listingService.entity.details;

import com.wedding.listingService.entity.Listing;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "photographer_details")
@PrimaryKeyJoinColumn(name = "listing_id")
@Data
@EqualsAndHashCode(callSuper = true)
public class PhotographerDetails extends Listing {
    private boolean droneAvailable;
    private boolean preShootIncluded;
}

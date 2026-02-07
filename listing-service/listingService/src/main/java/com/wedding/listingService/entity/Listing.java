package com.wedding.listingService.entity;

import com.wedding.listingService.enums.ListingStatus;
import jakarta.persistence.*;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "listing")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long vendorId; // extracted from X-Auth-User-Id

    @Column(nullable = false)
    private String title;

    @Lob
    private String description;

    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;

    @Column(nullable = false)
    private String category; // Mapped from the Category enum string

    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.PENDING; // Default status

    private Double avgRating = 0.0;

    // Task 1.3: Image Handling
    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true)
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private List<ListingImage> images = new ArrayList<>();

    public void addImages(List<String> imageUrls) {
        if (imageUrls != null) {
            imageUrls.forEach(url -> this.images.add(new ListingImage(this, url)));
        }
    }
}
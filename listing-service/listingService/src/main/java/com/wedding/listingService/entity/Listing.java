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
    private Long vendorId; 

    @Column(nullable = false)
    private String title;

    @Lob
    private String description;

    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;

    @Column(nullable = false)
    private String category; 

    @Enumerated(EnumType.STRING)
    private ListingStatus status = ListingStatus.PENDING; 

    private Double avgRating = 0.0;

    @OneToMany(mappedBy = "listing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ListingImage> images = new ArrayList<>();

    public void addImages(List<String> imageUrls) {
        if (imageUrls != null) {
            imageUrls.forEach(url -> this.images.add(new ListingImage(this, url)));
        }
    }
}
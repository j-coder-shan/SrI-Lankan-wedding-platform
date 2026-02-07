package com.wedding.listingService.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "listing_image")
@Data
@NoArgsConstructor
public class ListingImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "listing_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore // Prevent infinite recursion during serialization
    @lombok.ToString.Exclude // Prevent infinite recursion in toString()
    @lombok.EqualsAndHashCode.Exclude // Prevent infinite recursion in hashCode()
    private Listing listing;

    @Column(nullable = false)
    private String url;

    public ListingImage(Listing listing, String url) {
        this.listing = listing;
        this.url = url;
    }
}
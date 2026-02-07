package com.wedding.SearchService.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint; // Task 2.1 Geospatial Field
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed; // Task 2.1 Indexing
import org.springframework.data.mongodb.core.index.TextIndexed; // Task 2.1 Text Indexing
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "search_listings")
@Data
public class SearchListing {

    @Id
    private Long id; // Use the same ID as the MySQL Listing

    @TextIndexed // Task 2.1: Annotate title for text search
    private String title;

    @TextIndexed // Task 2.1: Annotate description for text search
    private String description;

    private String category;
    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE) // Task 2.1: 2D Sphere Indexing
    private GeoJsonPoint location;

    private Double avgRating;
    private String status; // PUBLISHED, PENDING, etc.
    private String mainImageUrl;
}
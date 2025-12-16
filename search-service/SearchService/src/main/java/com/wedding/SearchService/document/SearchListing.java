package com.wedding.SearchService.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint; 
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed; 
import org.springframework.data.mongodb.core.index.TextIndexed; 
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "search_listings")
@Data
public class SearchListing {

    @Id
    private Long id; 

    @TextIndexed 
    private String title;

    @TextIndexed 
    private String description;

    private String category;
    private Double priceMin;
    private Double priceMax;
    private String district;
    private String city;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE) 
    private GeoJsonPoint location;

    private Double avgRating;
    private String status; 
    public void setMainImageUrl(String mainImageUrl2) {
        throw new UnsupportedOperationException("Unimplemented method 'setMainImageUrl'");
    }
}
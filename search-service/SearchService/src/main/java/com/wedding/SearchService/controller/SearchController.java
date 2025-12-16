package com.wedding.SearchService.controller;

import com.wedding.SearchService.document.SearchListing;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoTemplate; // Task 2.4 Criteria Logic
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final MongoTemplate mongoTemplate;

    public SearchController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

   
    @GetMapping
    public List<SearchListing> searchListings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) Double userBudget,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon,
            @RequestParam(required = false, defaultValue = "10") Double maxDistanceKm) {

        Query query = new Query();

        if (keyword != null && !keyword.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(keyword, "i") // Simple regex for partial match
                    .orOperator(Criteria.where("description").regex(keyword, "i")));

            
        }

        if (district != null) {
            query.addCriteria(Criteria.where("district").is(district.toUpperCase()));
        }

        if (userBudget != null) {
            query.addCriteria(Criteria.where("priceMin").lte(userBudget));
        }

        if (lat != null && lon != null) {
            double maxDistanceMeters = maxDistanceKm * 1000;

            Point center = new Point(lon, lat);

            query.addCriteria(Criteria.where("location").near(center).maxDistance(maxDistanceMeters));
        }

        query.addCriteria(Criteria.where("status").is("PUBLISHED"));


        return mongoTemplate.find(query, SearchListing.class);
    }
}
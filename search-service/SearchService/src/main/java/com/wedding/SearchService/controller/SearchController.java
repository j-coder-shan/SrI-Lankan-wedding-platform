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

    /**
     * Endpoint: GET /api/search (Task 2.4)
     * Handles dynamic queries combining text, price, district, and geo-location.
     */
    @GetMapping
    public List<SearchListing> searchListings(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String category, // Added category filter
            @RequestParam(required = false) Double userBudget,
            @RequestParam(required = false) Double lat,
            @RequestParam(required = false) Double lon,
            @RequestParam(required = false, defaultValue = "10") Double maxDistanceKm) {

        System.out.println("🔍 Search Request Received: keyword=" + keyword + ", district=" + district
                + ", category=" + category + ", userBudget=" + userBudget);

        Query query = new Query();

        // 1. Text Search Criteria (using @TextIndexed fields)
        if (keyword != null && !keyword.isEmpty()) {
            query.addCriteria(Criteria.where("title").regex(keyword, "i") // Simple regex for partial match
                    .orOperator(Criteria.where("description").regex(keyword, "i")));
        }

        // 2. Criteria.where("district").is(district) (Task 2.4)
        if (district != null && !district.isEmpty()) {
            query.addCriteria(Criteria.where("district").regex(district, "i")); // Case-insensitive
        }

        // New Category Criteria - Case Insensitive
        if (category != null && !category.isEmpty()) {
            query.addCriteria(Criteria.where("category").regex(category, "i"));
        }

        // 3. Criteria.where("priceMin").lte(userBudget) (Task 2.4)
        if (userBudget != null) {
            query.addCriteria(Criteria.where("priceMin").lte(userBudget));
        }

        // 4. Geo Query: Criteria.where("location").near(Point).maxDistance(km) (Task
        // 2.4)
        if (lat != null && lon != null) {
            // MongoDB GeoJSON distance is typically in meters
            double maxDistanceMeters = maxDistanceKm * 1000;

            // Point takes (longitude, latitude)
            Point center = new Point(lon, lat);

            query.addCriteria(Criteria.where("location").near(center).maxDistance(maxDistanceMeters));
        }

        // Final Rule: Ensure only PUBLISHED listings are returned
        query.addCriteria(Criteria.where("status").is("PUBLISHED"));

        // Add sorting (e.g., sort by distance or rating) if needed

        List<SearchListing> results = mongoTemplate.find(query, SearchListing.class);
        System.out.println("✅ Search Results Found: " + results.size());
        results.forEach(r -> System.out.println("   - Found: " + r.getTitle() + " (" + r.getCategory() + ")"));

        return results;
    }
}
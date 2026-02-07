package com.wedding.SearchService.service;

import com.wedding.SearchService.document.SearchListing;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

// Defines the contract for all search operations
@SuppressWarnings("unused")
public interface SearchService {

    /**
     * Executes the dynamic search query built by the controller.
     * While the controller builds the Query object (Task 2.4),
     * the service layer executes it against MongoDB.
     *
     * @param query The MongoDB Query object containing criteria.
     * @return A list of matching SearchListing documents.
     */
    List<SearchListing> executeAdvancedSearch(Query query);

    // NOTE: For the Search Service, the bulk of the logic (CRUD) is in the Kafka
    // Consumer,
    // and the query building is in the Controller (using MongoTemplate).
    // This interface primarily serves to execute the final query.
}
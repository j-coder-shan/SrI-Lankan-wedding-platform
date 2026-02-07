package com.wedding.SearchService.service.impl;

import com.wedding.SearchService.document.SearchListing;
import com.wedding.SearchService.service.SearchService;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchServiceImpl implements SearchService {

    private final MongoTemplate mongoTemplate;

    public SearchServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @SuppressWarnings("null")
    @Override
    public List<SearchListing> executeAdvancedSearch(Query query) {
        // This is where the MongoTemplate performs the actual database lookup (Task
        // 2.4).
        return mongoTemplate.find(query, SearchListing.class);
    }
}

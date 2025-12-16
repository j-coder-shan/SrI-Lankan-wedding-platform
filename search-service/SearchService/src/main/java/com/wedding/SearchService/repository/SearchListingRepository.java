package com.wedding.SearchService.repository;

import com.wedding.SearchService.document.SearchListing;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SearchListingRepository extends MongoRepository<SearchListing, Long> {
}
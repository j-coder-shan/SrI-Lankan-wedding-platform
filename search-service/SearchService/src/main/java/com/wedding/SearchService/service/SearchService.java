package com.wedding.SearchService.service;

import com.wedding.SearchService.document.SearchListing;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface SearchService {

  
    List<SearchListing> executeAdvancedSearch(Query query);

   
}
package com.wedding.chat_service.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.wedding.chat_service.repository")
public class MongoConfig {
    // MongoDB configuration is handled by Spring Boot auto-configuration
    // This class enables repository scanning
}

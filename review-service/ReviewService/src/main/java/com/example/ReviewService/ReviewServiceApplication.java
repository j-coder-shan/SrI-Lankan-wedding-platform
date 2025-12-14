package com.example.ReviewService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

// src/main/java/com/vendor/review/ReviewServiceApplication.java
@SpringBootApplication
@EnableDiscoveryClient // Enables Eureka Client
@EnableFeignClients    // Enables Feign Client
public class ReviewServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewServiceApplication.class, args);
	}

}

package com.wedding.listingService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

/**
 * Main entry point for the Listing Service application.
 * This service handles vendor listings and related operations.
 */
@SpringBootApplication
@EnableKafka
public class ListingServiceApplication {

	/**
	 * The main method which serves as the entry point for the Spring Boot
	 * application.
	 * 
	 * @param args Command line arguments passed to the application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(ListingServiceApplication.class, args);
	}
}
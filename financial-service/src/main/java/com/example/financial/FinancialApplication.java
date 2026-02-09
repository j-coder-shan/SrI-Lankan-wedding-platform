package com.example.financial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * Financial Service Application for Sri Lankan Wedding Platform.
 * 
 * <p>
 * This microservice handles commission-based invoicing and payment processing
 * for wedding vendor bookings. It manages the financial transactions between
 * vendors and the platform, including commission calculations, invoice
 * generation,
 * and payment tracking.
 * </p>
 * 
 * <h2>Key Features:</h2>
 * <ul>
 * <li>Commission invoice generation based on booking values</li>
 * <li>Payment processing with multiple payment methods</li>
 * <li>Transaction history tracking</li>
 * <li>Kafka event publishing for invoice status changes</li>
 * <li>Integration with other microservices via Eureka and Feign</li>
 * </ul>
 * 
 * <h2>Enabled Features:</h2>
 * <ul>
 * <li><b>Service Discovery</b>: Registers with Eureka server for dynamic
 * service location</li>
 * <li><b>Feign Clients</b>: Enables declarative REST client for inter-service
 * communication</li>
 * </ul>
 * 
 * @author Sri Lankan Wedding Platform Team
 * @version 1.0
 * @since 2024
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class FinancialApplication {

    /**
     * Main entry point for the Financial Service application.
     * 
     * <p>
     * Initializes the Spring Boot application context and starts the embedded
     * web server on the configured port (default: 8084).
     * </p>
     * 
     * @param args command-line arguments passed to the application
     */
    public static void main(String[] args) {
        SpringApplication.run(FinancialApplication.class, args);
    }

}

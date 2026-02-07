package com.example.analytics_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AnalyticsServiceApplication {

    public static void main(String[] args) {
        System.setProperty("spring.datasource.url", "jdbc:postgresql://localhost:5435/wedding_analytics");
        System.setProperty("spring.datasource.username", "postgres");
        System.setProperty("spring.datasource.password", "1234");
        SpringApplication.run(AnalyticsServiceApplication.class, args);
    }

    @org.springframework.beans.factory.annotation.Value("${spring.datasource.password}")
    private String dbPassword;

    @org.springframework.beans.factory.annotation.Value("${spring.datasource.url}")
    private String dbUrl;

    @org.springframework.context.annotation.Bean
    public org.springframework.boot.CommandLineRunner debugRunner() {
        return args -> {
            System.out.println("==========================================");
            System.out.println("DEBUG: DB URL: " + dbUrl);
            System.out.println("DEBUG: DB PASSWORD: " + dbPassword);
            System.out.println("==========================================");
        };
    }
}

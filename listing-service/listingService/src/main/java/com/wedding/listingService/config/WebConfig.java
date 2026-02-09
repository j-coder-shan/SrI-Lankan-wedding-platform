package com.wedding.listingService.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map /api/listings/uploads/** to the local file system uploads directory
        // This matches the path forwarded by the API Gateway (without strip prefix)
        String uploadPath = Paths.get("uploads").toAbsolutePath().toUri().toString();
        if (!uploadPath.endsWith("/")) {
            uploadPath += "/";
        }
        System.out.println("DEBUG: Serving uploads from: " + uploadPath);
        registry.addResourceHandler("/api/listings/uploads/**")
                .addResourceLocations(uploadPath);
    }
}

package com.wedding.api_gateway.filter;

import com.wedding.api_gateway.util.JwtUtil;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthFilter extends AbstractGatewayFilterFactory<CustomAuthFilter.Config> {

    private final RouteValidator validator;
    private final JwtUtil jwtUtil;

    public CustomAuthFilter(RouteValidator validator, JwtUtil jwtUtil) {
        super(Config.class);
        this.validator = validator;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            // 1. Check if the route requires security
            if (validator.isSecured.test(exchange.getRequest())) {

                // 2. Check for Authorization header
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                // 3. Extract the token
                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }

                // 4. Validate Token & Inject Headers
                try {
                    jwtUtil.validateToken(authHeader);

                    // Extract claims
                    String userId = jwtUtil.extractUserId(authHeader);
                    String role = jwtUtil.extractUserRole(authHeader);

                    // Mutate the request to add headers for downstream services
                    exchange = exchange.mutate()
                            .request(r -> r.headers(headers -> {
                                headers.add("X-Auth-User-Id", userId);
                                headers.add("X-Auth-User-Role", role);
                            }))
                            .build();

                } catch (Exception e) {
                    System.out.println("Invalid Token access: " + e.getMessage());
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {
        // Configuration properties can be added here if needed
    }
}
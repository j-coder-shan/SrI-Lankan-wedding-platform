package com.wedding.api_gateway.filter;

import com.wedding.api_gateway.util.JwtUtil;
import java.util.List;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
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
                // 2. Check for Authorization header
                List<String> authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);
                if (authHeaders == null || authHeaders.isEmpty()) {
                    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                }

                // 3. Extract the token
                String authHeader = authHeaders.get(0);
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    authHeader = authHeader.substring(7);
                }

                // 4. Validate Token & Inject Headers
                try {
                    jwtUtil.validateToken(authHeader);

                    // Extract claims
                    String userId = jwtUtil.extractUserId(authHeader);
                    String role = jwtUtil.extractUserRole(authHeader);

                    System.out.println("DEBUG: Token Validated. UserId: " + userId + ", Role: " + role);

                    // Use Decorator to safely modify headers (bypassing ReadOnlyHttpHeaders issue)
                    ServerHttpRequest request = exchange.getRequest();
                    ServerHttpRequestDecorator decoratedRequest = new ServerHttpRequestDecorator(request) {
                        @Override
                        public HttpHeaders getHeaders() {
                            HttpHeaders headers = new HttpHeaders();
                            headers.putAll(super.getHeaders());
                            if (userId != null)
                                headers.set("X-Auth-User-Id", userId);
                            if (role != null)
                                headers.set("X-Auth-User-Role", role);
                            return headers;
                        }
                    };

                    exchange = exchange.mutate().request(decoratedRequest).build();

                } catch (Exception e) {
                    System.out
                            .println("Invalid Token access error: " + e.getClass().getName() + " - " + e.getMessage());
                    e.printStackTrace(); // Print stack trace to find NPE source
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
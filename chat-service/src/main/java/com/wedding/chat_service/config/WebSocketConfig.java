package com.wedding.chat_service.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private JwtChannelInterceptor jwtChannelInterceptor;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Enable simple broker for destinations with prefixes /topic and /queue
        registry.enableSimpleBroker("/topic", "/queue");

        // Prefix for messages bound for @MessageMapping methods
        registry.setApplicationDestinationPrefixes("/app");

        // Prefix for user-specific destinations
        registry.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3000") // Frontend URL
                .withSockJS(); // Fallback for browsers that don't support WebSocket
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // Add JWT interceptor to validate tokens on WebSocket connection
        registration.interceptors(jwtChannelInterceptor);
    }
}

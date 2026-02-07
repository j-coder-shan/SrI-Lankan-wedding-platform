package com.wedding.chat_service.config;

import com.wedding.chat_service.security.ChatUser;
import com.wedding.chat_service.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(@SuppressWarnings("null") Message<?> message,
            @SuppressWarnings("null") MessageChannel channel) {

        @SuppressWarnings("null")
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // Only validate on CONNECT frame (when client first connects)
        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand())) {

            // Extract Authorization header
            String authHeader = accessor.getFirstNativeHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                // Validate token
                if (jwtUtil.validateToken(token)) {
                    Long userId = jwtUtil.extractUserId(token);
                    String role = jwtUtil.extractRole(token);

                    // Set user in WebSocket session
                    accessor.setUser(new ChatUser(userId, role));
                } else {
                    throw new IllegalArgumentException("Invalid JWT token");
                }
            } else {
                throw new IllegalArgumentException("Missing Authorization header");
            }
        }

        return message;
    }
}
package com.wedding.chat_service.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    private static final String HMAC_ALGO = "HmacSHA256";
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Validate structure, signature, and optional exp claim
    public boolean validateToken(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false; // header.payload.signature
            }

            String header = parts[0];
            String payload = parts[1];
            String signature = parts[2];

            // Recompute signature
            String data = header + "." + payload;
            String expectedSignature = sign(data);

            if (!constantTimeEquals(signature, expectedSignature)) {
                return false;
            }

            // Optional: validate exp claim if present
            Map<String, Object> claims = extractAllClaims(token);
            Object expObj = claims.get("exp");
            if (expObj != null) {
                long expSeconds = Long.parseLong(expObj.toString());
                long nowSeconds = System.currentTimeMillis() / 1000;
                if (expSeconds < nowSeconds) {
                    return false; // token expired
                }
            }

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long extractUserId(String token) {
        Map<String, Object> claims = extractAllClaims(token);
        Object userId = claims.get("userId");
        if (userId == null) {
            return null;
        }
        if (userId instanceof Number) {
            return ((Number) userId).longValue();
        }
        return Long.parseLong(userId.toString());
    }

    public String extractRole(String token) {
        Map<String, Object> claims = extractAllClaims(token);
        Object role = claims.get("role");
        return role != null ? role.toString() : null;
    }

    private Map<String, Object> extractAllClaims(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid JWT token format");
            }

            String payload = parts[1];
            byte[] decodedBytes = Base64.getUrlDecoder().decode(payload);
            String json = new String(decodedBytes, StandardCharsets.UTF_8);

            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JWT", e);
        }
    }

    private String sign(String data) throws Exception {
        SecretKeySpec keySpec = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), HMAC_ALGO);
        Mac mac = Mac.getInstance(HMAC_ALGO);
        mac.init(keySpec);
        byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));

        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(rawHmac);
    }

    // Prevent timing attacks (simple constant-time comparison)
    private boolean constantTimeEquals(String a, String b) {
        if (a == null || b == null || a.length() != b.length()) {
            return false;
        }
        int result = 0;
        for (int i = 0; i < a.length(); i++) {
            result |= a.charAt(i) ^ b.charAt(i);
        }
        return result == 0;
    }
}

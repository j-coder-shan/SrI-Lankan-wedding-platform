package com.wedding.api_gateway.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    public void validateToken(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("JWT token is missing");
        }
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    public String extractUserId(String token) {
        Claims claims = extractAllClaims(token);
        Object id = claims.get("userId");
        return id == null ? null : id.toString();
    }

    public String extractUserRole(String token) {
        Claims claims = extractAllClaims(token);
        Object role = claims.get("role");
        return role == null ? null : role.toString();
    }

    private Key getSignKey() {
        byte[] keyBytes;
        try {
            // Try Base64 first (common for jjwt examples)
            keyBytes = Decoders.BASE64.decode(secret);
        } catch (IllegalArgumentException e) {
            // Fallback: try hex decoding if secret is provided as hex string
            try {
                keyBytes = hexStringToByteArray(secret);
            } catch (Exception ex) {
                throw new IllegalStateException("Failed to decode jwt.secret as Base64 or hex", ex);
            }
        }
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private static byte[] hexStringToByteArray(String s) {
        if (s == null) throw new IllegalArgumentException("Secret is null");
        int len = s.length();
        if ((len & 1) != 0) throw new IllegalArgumentException("Hex string must have even length");
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        Jws<Claims> parsed = Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
        return parsed.getBody();
    }
}

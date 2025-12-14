package com.wedding.auth_service.service;

import com.wedding.auth_service.dto.AuthRequest;
import com.wedding.auth_service.dto.AuthResponse;
import com.wedding.auth_service.dto.RefreshTokenRequest;
import com.wedding.auth_service.dto.RegisterRequest;
import com.wedding.auth_service.entity.RefreshToken;
import com.wedding.auth_service.entity.User;
import com.wedding.auth_service.repository.RefreshTokenRepository;
import com.wedding.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(request.getRole())
                .isActive(true)
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = createRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .userId(user.getId())
                .role(user.getRole())
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = createRefreshToken(user); // Rotate refresh token on login

        return AuthResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken.getToken())
                .userId(user.getId())
                .role(user.getRole())
                .build();
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        return refreshTokenRepository.findByToken(request.getToken())
                .map(refreshToken -> {
                    // Check Expiry (Simple check, ideally configure in entity)
                    // For now, assume valid if exists. Real app needs date check.
                    var user = refreshToken.getUser();
                    var accessToken = jwtService.generateToken(user);
                    return AuthResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(refreshToken.getToken())
                            .build();
                }).orElseThrow(() -> new RuntimeException("Refresh token is not in database!"));
    }

    private RefreshToken createRefreshToken(User user) {
        // Delete old token if exists
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(604800000)) // 7 Days
                .build();
        return refreshTokenRepository.save(refreshToken);
    }
}
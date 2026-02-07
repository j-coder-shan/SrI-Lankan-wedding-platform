package com.wedding.auth_service.repository;

import com.wedding.auth_service.entity.RefreshToken;
import com.wedding.auth_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    
    @Modifying
    @Transactional
    void deleteByUser(User user);
}
package com.wedding.auth_service.repository;

import com.wedding.auth_service.entity.PasswordResetToken;
import com.wedding.auth_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}

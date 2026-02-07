package com.wedding.auth_service.dto;

import lombok.Data;

@Data
public class RefreshTokenRequest {
    private String token;
}
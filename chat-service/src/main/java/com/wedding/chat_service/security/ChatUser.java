package com.wedding.chat_service.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.Principal;

@Getter
@AllArgsConstructor
public class ChatUser implements Principal {

    private Long userId;
    private String role;

    @Override
    public String getName() {
        return userId.toString();
    }
}
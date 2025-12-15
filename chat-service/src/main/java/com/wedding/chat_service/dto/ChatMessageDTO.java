package com.wedding.chat_service.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class ChatMessageDTO {

    @NotNull(message = "Conversation ID is required")
    private String conversationId;

    @NotBlank(message = "Message content cannot be empty")
    private String content;
}
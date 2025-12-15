package com.wedding.chat_service.dto;


import com.wedding.chat_service.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDTO {

    private String id;
    private String conversationId;
    private Long senderId;
    private String content;
    private Instant timestamp;
    private MessageStatus status;
}
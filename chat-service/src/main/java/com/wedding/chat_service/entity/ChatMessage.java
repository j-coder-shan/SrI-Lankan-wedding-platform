package com.wedding.chat_service.entity;

import com.wedding.chat_service.enums.MessageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "chat_messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    private String id;

    @Indexed
    private String conversationId;

    private Long senderId;
    private String content;

    @Indexed
    private Instant timestamp = Instant.now();

    private MessageStatus status = MessageStatus.SENT;
}
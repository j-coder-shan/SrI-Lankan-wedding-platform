package com.wedding.chat_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {

    @Id
    private String id;

    @Indexed
    private Long senderId;

    @Indexed
    private Long receiverId;

    @Indexed
    private Long listingId;

    private String messageContent;

    @Indexed
    private LocalDateTime createdAt = LocalDateTime.now();

    // Optional: Snapshots for display purposes
    private String senderNameSnapshot;
    private String listingTitleSnapshot;
}

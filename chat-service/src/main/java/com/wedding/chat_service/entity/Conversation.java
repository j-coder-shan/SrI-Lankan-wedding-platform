package com.wedding.chat_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "conversations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conversation {

    @Id
    private String id;

    @Indexed(unique = true)
    private Long enquiryId;

    // Couple Details (Snapshot)
    private Long coupleId;
    private String coupleNameSnapshot;
    private String coupleImageSnapshot;

    // Vendor Details (Snapshot)
    private Long vendorId;
    private String vendorNameSnapshot;
    private String vendorImageSnapshot;

    // Metadata
    private Instant lastMessageAt;
    private int unreadCountCouple = 0;
    private int unreadCountVendor = 0;
    private boolean isActive = true;

    private Instant createdAt = Instant.now();
}
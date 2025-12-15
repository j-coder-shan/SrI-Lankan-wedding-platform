package com.wedding.chat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversationDTO {

    private String id;
    private Long enquiryId;

    // Couple Info
    private Long coupleId;
    private String coupleName;
    private String coupleImage;

    // Vendor Info
    private Long vendorId;
    private String vendorName;
    private String vendorImage;

    // Metadata
    private Instant lastMessageAt;
    private int unreadCount; // Will be calculated based on current user
    private String lastMessage; // Preview
}
package com.wedding.chat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorMessageResponse {

    private String id;
    private Long senderId;
    private String senderName;
    private Long listingId;
    private String listingTitle;
    private String messageContent;
    private LocalDateTime createdAt;
}

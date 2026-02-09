package com.wedding.chat_service.dto;

import lombok.Data;

@Data
public class StartConversationByListingRequest {
    private Long listingId;
    private Long vendorId;
    private String vendorName;
    private String listingTitle;
    private String listingImage;
}

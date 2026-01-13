package com.wedding.chat_service.dto;

import lombok.Data;

@Data
public class StartConversationRequest {

    private Long enquiryId;
    private Long coupleId;
    private String coupleName;
    private Long vendorId;
    private String vendorName;
}

package com.wedding.chat_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {

    @NotNull(message = "Receiver ID is required")
    private Long receiverId;

    @NotNull(message = "Listing ID is required")
    private Long listingId;

    @NotBlank(message = "Message content cannot be empty")
    private String messageContent;

    // Optional: For snapshot purposes
    private String senderNameSnapshot;
    private String listingTitleSnapshot;
}

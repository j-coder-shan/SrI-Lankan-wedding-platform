package com.wedding.chat_service.service;

import com.wedding.chat_service.dto.SendMessageRequest;
import com.wedding.chat_service.dto.VendorMessageResponse;
import com.wedding.chat_service.entity.Message;
import com.wedding.chat_service.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    /**
     * Send a new message from couple to vendor
     * 
     * @param request  Message details
     * @param senderId Sender ID extracted from JWT token
     * @return Saved message
     */
    public Message sendMessage(SendMessageRequest request, Long senderId) {
        Message message = new Message();
        message.setSenderId(senderId);
        message.setReceiverId(request.getReceiverId());
        message.setListingId(request.getListingId());
        message.setMessageContent(request.getMessageContent());
        message.setCreatedAt(LocalDateTime.now());

        // Store snapshots if provided
        message.setSenderNameSnapshot(request.getSenderNameSnapshot());
        message.setListingTitleSnapshot(request.getListingTitleSnapshot());

        return messageRepository.save(message);
    }

    /**
     * Get all messages for a vendor
     * 
     * @param vendorId Vendor ID extracted from JWT token
     * @return List of messages with sender and listing details
     */
    public List<VendorMessageResponse> getVendorMessages(Long vendorId) {
        List<Message> messages = messageRepository.findByReceiverIdOrderByCreatedAtDesc(vendorId);

        return messages.stream()
                .map(this::mapToVendorResponse)
                .collect(Collectors.toList());
    }

    /**
     * Map Message entity to VendorMessageResponse DTO
     */
    private VendorMessageResponse mapToVendorResponse(Message message) {
        VendorMessageResponse response = new VendorMessageResponse();
        response.setId(message.getId());
        response.setSenderId(message.getSenderId());
        response.setSenderName(message.getSenderNameSnapshot() != null
                ? message.getSenderNameSnapshot()
                : "User #" + message.getSenderId());
        response.setListingId(message.getListingId());
        response.setListingTitle(message.getListingTitleSnapshot() != null
                ? message.getListingTitleSnapshot()
                : "Listing #" + message.getListingId());
        response.setMessageContent(message.getMessageContent());
        response.setCreatedAt(message.getCreatedAt());
        return response;
    }

    /**
     * Delete a message by ID
     * 
     * @param messageId Message ID to delete
     * @param vendorId  Vendor ID (to verify ownership)
     */
    public void deleteMessage(String messageId, Long vendorId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new RuntimeException("Message not found"));

        // Verify the message belongs to this vendor
        if (!message.getReceiverId().equals(vendorId)) {
            throw new RuntimeException("Unauthorized to delete this message");
        }

        messageRepository.deleteById(messageId);
    }
}

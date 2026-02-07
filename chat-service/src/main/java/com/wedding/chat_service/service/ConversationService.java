package com.wedding.chat_service.service;

import com.wedding.chat_service.entity.Conversation;
import com.wedding.chat_service.dto.ConversationDTO;
import com.wedding.chat_service.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;

    /**
     * Get or create conversation for an enquiry
     */
    public Conversation getOrCreateConversation(Long enquiryId,
            Long coupleId,
            String coupleName,
            Long vendorId,
            String vendorName) {

        return conversationRepository.findByEnquiryId(enquiryId)
                .orElseGet(() -> {
                    Conversation conversation = new Conversation();
                    conversation.setEnquiryId(enquiryId);
                    conversation.setCoupleId(coupleId);
                    conversation.setCoupleNameSnapshot(coupleName);
                    conversation.setVendorId(vendorId);
                    conversation.setVendorNameSnapshot(vendorName);
                    conversation.setLastMessageAt(Instant.now());
                    return conversationRepository.save(conversation);
                });
    }

    public List<ConversationDTO> getMyConversations(Long userId) {

        List<Conversation> conversations = conversationRepository
                .findByCoupleIdOrVendorIdOrderByLastMessageAtDesc(userId, userId);

        return conversations.stream()
                .map(conv -> mapToDTO(conv, userId))
                .collect(Collectors.toList());
    }

    public void updateConversationMetadata(String conversationId, Long senderId) {

        @SuppressWarnings("null")
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        conversation.setLastMessageAt(Instant.now());

        if (conversation.getCoupleId().equals(senderId)) {
            conversation.setUnreadCountVendor(conversation.getUnreadCountVendor() + 1);
        } else {
            conversation.setUnreadCountCouple(conversation.getUnreadCountCouple() + 1);
        }

        conversationRepository.save(conversation);
    }

    public void markAsRead(String conversationId, Long userId) {

        @SuppressWarnings("null")
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        if (conversation.getCoupleId().equals(userId)) {
            conversation.setUnreadCountCouple(0);
        } else {
            conversation.setUnreadCountVendor(0);
        }

        conversationRepository.save(conversation);
    }

    private ConversationDTO mapToDTO(Conversation conv, Long currentUserId) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conv.getId());
        dto.setEnquiryId(conv.getEnquiryId());
        dto.setLastMessageAt(conv.getLastMessageAt());

        if (conv.getCoupleId().equals(currentUserId)) {
            dto.setUnreadCount(conv.getUnreadCountCouple());

            dto.setVendorId(conv.getVendorId());
            dto.setVendorName(conv.getVendorNameSnapshot());
            dto.setVendorImage(conv.getVendorImageSnapshot());
        } else {
            dto.setUnreadCount(conv.getUnreadCountVendor());
            // Show couple details
            dto.setCoupleId(conv.getCoupleId());
            dto.setCoupleName(conv.getCoupleNameSnapshot());
            dto.setCoupleImage(conv.getCoupleImageSnapshot());
        }

        return dto;
    }
}
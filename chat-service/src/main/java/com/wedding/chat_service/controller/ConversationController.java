package com.wedding.chat_service.controller;

import com.wedding.chat_service.entity.Conversation;
import com.wedding.chat_service.dto.ConversationDTO;
import com.wedding.chat_service.dto.MessageResponseDTO;
import com.wedding.chat_service.service.ChatService;
import com.wedding.chat_service.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ConversationController {

    private final ConversationService conversationService;
    private final ChatService chatService;

    /**
     * Start or get conversation for an enquiry
     * GET /api/chat/start/{enquiryId}
     */
    @GetMapping("/start/{enquiryId}")
    public ResponseEntity<String> startConversation(
            @PathVariable Long enquiryId,
            @RequestParam Long coupleId,
            @RequestParam String coupleName,
            @RequestParam Long vendorId,
            @RequestParam String vendorName) {

        Conversation conversation = conversationService.getOrCreateConversation(
                enquiryId, coupleId, coupleName, vendorId, vendorName
        );

        return ResponseEntity.ok(conversation.getId());
    }

    /**
     * Get all conversations for current user
     * GET /api/chat/conversations/me
     */
    @GetMapping("/conversations/me")
    public ResponseEntity<List<ConversationDTO>> getMyConversations(
            @RequestHeader("X-Auth-User-Id") Long userId) {

        List<ConversationDTO> conversations = conversationService.getMyConversations(userId);
        return ResponseEntity.ok(conversations);
    }

    /**
     * Get message history for a conversation
     * GET /api/chat/history/{conversationId}
     */
    @GetMapping("/history/{conversationId}")
    public ResponseEntity<Page<MessageResponseDTO>> getHistory(
            @PathVariable String conversationId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<MessageResponseDTO> messages = chatService.getMessageHistory(conversationId, pageable);

        return ResponseEntity.ok(messages);
    }

    /**
     * Mark conversation as read
     * POST /api/chat/read/{conversationId}
     */
    @PostMapping("/read/{conversationId}")
    public ResponseEntity<Void> markAsRead(
            @PathVariable String conversationId,
            @RequestHeader("X-Auth-User-Id") Long userId) {

        conversationService.markAsRead(conversationId, userId);
        return ResponseEntity.ok().build();
    }
}

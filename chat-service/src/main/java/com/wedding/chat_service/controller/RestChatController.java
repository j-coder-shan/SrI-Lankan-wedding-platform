package com.wedding.chat_service.controller;

import com.wedding.chat_service.dto.SendMessageRequest;
import com.wedding.chat_service.dto.VendorMessageResponse;
import com.wedding.chat_service.entity.Message;
import com.wedding.chat_service.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class RestChatController {

    private final MessageService messageService;

    /**
     * Send a message from couple to vendor
     * Endpoint: POST /api/chat/send
     * Header: X-Auth-User-Id (injected by API Gateway)
     */
    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(
            @Valid @RequestBody SendMessageRequest request,
            @RequestHeader("X-Auth-User-Id") Long senderId) {
        Message savedMessage = messageService.sendMessage(request, senderId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }

    /**
     * Get all messages for the authenticated vendor
     * Endpoint: GET /api/chat/vendor/me
     * Header: X-Auth-User-Id (injected by API Gateway)
     */
    @GetMapping("/vendor/me")
    public ResponseEntity<List<VendorMessageResponse>> getVendorMessages(
            @RequestHeader("X-Auth-User-Id") Long vendorId) {
        List<VendorMessageResponse> messages = messageService.getVendorMessages(vendorId);
        return ResponseEntity.ok(messages);
    }

    /**
     * Delete a message by ID
     * Endpoint: DELETE /api/chat/message/{messageId}
     * Header: X-Auth-User-Id (injected by API Gateway)
     */
    @DeleteMapping("/message/{messageId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable String messageId,
            @RequestHeader("X-Auth-User-Id") Long vendorId) {
        messageService.deleteMessage(messageId, vendorId);
        return ResponseEntity.noContent().build();
    }
}

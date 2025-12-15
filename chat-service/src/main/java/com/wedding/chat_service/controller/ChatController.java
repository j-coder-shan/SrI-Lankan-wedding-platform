package com.wedding.chat_service.controller;

import com.wedding.chat_service.entity.ChatMessage;
import com.wedding.chat_service.entity.Conversation;
import com.wedding.chat_service.dto.ChatMessageDTO;
import com.wedding.chat_service.security.ChatUser;
import com.wedding.chat_service.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class ChatController {

        private final ChatService chatService;
        private final SimpMessagingTemplate messagingTemplate;

        @MessageMapping("/chat.send")
        public void sendMessage(@Payload ChatMessageDTO messageDTO, Principal principal) {

                ChatUser user = (ChatUser) principal;

                ChatMessage message = chatService.saveMessage(
                                messageDTO.getConversationId(),
                                user.getUserId(),
                                messageDTO.getContent());

                // Get conversation to determine recipient
                Conversation conversation = chatService.getConversation(
                                messageDTO.getConversationId());

                // Determine recipient ID
                Long recipientId = conversation.getCoupleId().equals(user.getUserId())
                                ? conversation.getVendorId()
                                : conversation.getCoupleId();

                // Push message to recipient's personal queue
                // Recipient subscribes to: /user/queue/messages
                messagingTemplate.convertAndSendToUser(
                                recipientId.toString(),
                                "/queue/messages",
                                message);
        }
}
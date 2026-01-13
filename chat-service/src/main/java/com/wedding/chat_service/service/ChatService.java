package com.wedding.chat_service.service;

import com.wedding.chat_service.entity.ChatMessage;
import com.wedding.chat_service.entity.Conversation;
import com.wedding.chat_service.dto.MessageResponseDTO;
import com.wedding.chat_service.enums.MessageStatus;
import com.wedding.chat_service.repository.ChatMessageRepository;
import com.wedding.chat_service.repository.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final ConversationService conversationService;

    @Transactional
    public ChatMessage saveMessage(String conversationId, Long senderId, String content) {

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        ChatMessage message = new ChatMessage();
        message.setConversationId(conversationId);
        message.setSenderId(senderId);
        message.setContent(content);
        message.setStatus(MessageStatus.SENT);

        ChatMessage saved = messageRepository.save(message);

        conversationService.updateConversationMetadata(conversationId, senderId);

        return saved;
    }

    public Page<MessageResponseDTO> getMessageHistory(String conversationId, Pageable pageable) {

        Page<ChatMessage> messages = messageRepository
                .findByConversationIdOrderByTimestampDesc(conversationId, pageable);

        return messages.map(this::mapToDTO);
    }

    public Conversation getConversation(String conversationId) {
        return conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    private MessageResponseDTO mapToDTO(ChatMessage message) {
        MessageResponseDTO dto = new MessageResponseDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversationId());
        dto.setSenderId(message.getSenderId());
        dto.setContent(message.getContent());
        dto.setTimestamp(message.getTimestamp());
        dto.setStatus(message.getStatus());
        return dto;
    }
}

package com.wedding.chat_service.repository;

import com.wedding.chat_service.entity.ChatMessage;
import com.wedding.chat_service.enums.MessageStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    Page<ChatMessage> findByConversationIdOrderByTimestampDesc(
            String conversationId, Pageable pageable
    );

    List<ChatMessage> findByConversationIdAndStatus(
            String conversationId, MessageStatus status
    );
}
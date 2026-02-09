package com.wedding.chat_service.repository;

import com.wedding.chat_service.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {

    /**
     * Find all messages for a specific receiver (vendor), ordered by newest first
     */
    List<Message> findByReceiverIdOrderByCreatedAtDesc(Long receiverId);

    /**
     * Find all messages for a specific listing
     */
    List<Message> findByListingIdOrderByCreatedAtDesc(Long listingId);
}

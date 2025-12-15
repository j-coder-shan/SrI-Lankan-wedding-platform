package com.wedding.chat_service.repository;

import com.wedding.chat_service.entity.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {

    Optional<Conversation> findByEnquiryId(Long enquiryId);

    List<Conversation> findByCoupleIdOrVendorIdOrderByLastMessageAtDesc(
            Long coupleId, Long vendorId
    );
}
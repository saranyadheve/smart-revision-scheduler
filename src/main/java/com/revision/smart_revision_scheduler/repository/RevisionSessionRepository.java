package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.model.RevisionSession;
import com.revision.smart_revision_scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RevisionSessionRepository extends JpaRepository<RevisionSession, Long> {
    
    // Calculate how often this topic has been studied
    long countByUserAndTopicName(User user, String topicName);
    
    // Find the most recent session for this topic to calculate gap days
    Optional<RevisionSession> findTopByUserAndTopicNameOrderByStudiedDateDesc(User user, String topicName);
}

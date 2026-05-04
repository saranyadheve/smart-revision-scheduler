package com.revision.smart_revision_scheduler.repository;

import com.revision.smart_revision_scheduler.entity.LearningContent;
import com.revision.smart_revision_scheduler.entity.LearningTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface LearningContentRepository extends JpaRepository<LearningContent, Long> {
    Optional<LearningContent> findByTopic(LearningTopic topic);
}
